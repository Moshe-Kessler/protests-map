import { Flag } from './flag';
import { FlagFirestore } from './flag.firestore';
import { FlagPagestore } from './flag.pagestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  uid = this.getUid();
  constructor(
    private firestore: FlagFirestore,
    private pagestore: FlagPagestore
  ) {
    this.firestore
      .collection$()
      .pipe(
        map((flags) => {
          this.pagestore.patch(
            {
              loading: false,
              flags,
              liveFlags: this.getLiveFlags(flags),
              hasLiveFlag: this.getHasLiveFlags(flags),
              myFlags: flags.filter((flag) => flag.uid === this.uid),
              totalFlags: flags.length,
              totalLiveFlags: this.getTotalLiveFlags(flags),
              totalUserFlags: flags.filter((flag) => flag.uid === this.uid)
                .length,
              totalUniqueUsers: this.getTotalUniqueUsers(flags),
            },
            'flags subscription'
          );
        })
      )
      .subscribe();
  }
  get flags$() {
    return this.pagestore.state$.pipe(map((state) => state.flags));
  }
  get myFlags$() {
    return this.pagestore.state$.pipe(map((state) => state.myFlags));
  }
  get liveFlags$() {
    return this.pagestore.state$.pipe(map((state) => state.liveFlags));
  }
  get hasLiveFlag$() {
    return this.pagestore.state$.pipe(map((state) => state.hasLiveFlag));
  }
  get loading$() {
    return this.pagestore.state$.pipe(map((state) => state.loading));
  }
  get error$() {
    return this.pagestore.state$.pipe(map((state) => state.error));
  }
  get action$() {
    return this.pagestore.state$.pipe(map((state) => state.action));
  }
  get formStatus$() {
    return this.pagestore.state$.pipe(map((state) => state.formStatus));
  }
  get totalFlags$() {
    return this.pagestore.state$.pipe(map((state) => state.totalFlags));
  }
  get totalLiveFlags$() {
    return this.pagestore.state$.pipe(map((state) => state.totalLiveFlags));
  }
  get totalUserFlags$() {
    return this.pagestore.state$.pipe(map((state) => state.totalUserFlags));
  }
  get totalUniqueUsers$() {
    return this.pagestore.state$.pipe(map((state) => state.totalUniqueUsers));
  }

  getUid() {
    const uid = JSON.parse(localStorage.getItem('user') as string).uid;
    return uid
      ? uid
      : this.pagestore.patch(
          {
            error: "You're not signed in",
            action: 'sign in',
          },
          'get uid'
        );
  }

  async create(flag: Flag) {
    if (this.pagestore.state.hasLiveFlag) {
      return await this.update(flag);
    }
    this.pagestore.patch(
      {
        loading: true,
        flags: [],
        myFlags: [],
        formStatus: 'saving',
      },
      'create flag'
    );
    try {
      await this.firestore.create(flag);
      setTimeout(() => {
        this.pagestore.patch(
          {
            loading: false,
            formStatus: 'saved',
          },
          'created flag'
        );
        window.location.href = '/flags';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error creating flag'
      );
    }
  }
  private async update(flag: Flag) {
    this.pagestore.patch(
      { loading: true, formStatus: 'saving' },
      'updating flag'
    );
    try {
      await this.firestore.update(flag, this.pagestore.state.myFlags[0].id!);
      setTimeout(() => {
        this.pagestore.patch(
          { loading: false, formStatus: 'saved' },
          'updated flag'
        );
        window.location.href = 'flags';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error updating flag'
      );
    }
  }
  private getLiveFlags(flags: Flag[]) {
    return flags.filter(
      (flag) => Date.now() - flag.createdAt! < 60 * 60 * 1000
    );
  }

  private getHasLiveFlags(flags: Flag[]) {
    return (
      flags.filter(
        (flag) =>
          flag.uid === this.uid && Date.now() - flag.createdAt! < 60 * 60 * 1000
      ).length > 0
    );
  }

  private getTotalLiveFlags(flags: Flag[]) {
    return flags.filter((flag) => Date.now() - flag.createdAt! < 60 * 60 * 1000)
      .length;
  }

  private getTotalUniqueUsers(flags: Flag[]) {
    const uniqueUsers = [...new Set(flags.map((flag) => flag.uid))];
    return uniqueUsers.length;
  }
}
