import { AuthAbstract } from '../core/auth.abstract';
import { Injectable } from '@angular/core';
import { UserPagestore } from './user.pagestroe';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private pagestore: UserPagestore, private auth: AuthAbstract) {
    this.auth.user$
      .pipe(
        map((user) => {
          this.pagestore.patch(
            {
              loading: false,
              uid: user?.uid,
              isLoggedIn: user?.uid ? true : false,
            },
            'auth subscription'
          );
        })
      )
      .subscribe();
  }

  get uid$() {
    return this.pagestore.state$.pipe(map((state) => state.uid));
  }
  get loading$() {
    return this.pagestore.state$.pipe(map((state) => state.loading));
  }
  get isLoggedIn$() {
    return this.pagestore.state$.pipe(map((state) => state.isLoggedIn));
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

  async signInWithGoogle() {
    this.pagestore.patch(
      { loading: true, formStatus: 'signing in' },
      'signing in with google'
    );
    try {
      await this.auth.signInWithPopup();
      setTimeout(() => {
        this.pagestore.patch(
          {
            loading: false,
            formStatus: 'signed in',
            isLoggedIn: true,
          },
          'signed in with google'
        );
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error signing in with google'
      );
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    this.pagestore.patch(
      { loading: true, formStatus: 'signing in' },
      'signing in'
    );
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      setTimeout(() => {
        this.pagestore.patch(
          {
            loading: false,
            formStatus: 'signed in',
            isLoggedIn: true,
          },
          'signed in'
        );
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error signing in'
      );
    }
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    this.pagestore.patch(
      { loading: true, formStatus: 'signing up' },
      'signing up'
    );
    try {
      await this.auth.signUpWithEmailAndPassword(email, password);
      setTimeout(() => {
        this.pagestore.patch(
          { loading: false, formStatus: 'signed up' },
          'signed up'
        );
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error signing up'
      );
    }
  }
  async signUpAnonymously() {
    try {
      this.pagestore.patch(
        { loading: true, formStatus: 'signin in' },
        'signing in anonymously'
      );
      await this.auth.signInAnonymously();
      setTimeout(() => {
        this.pagestore.patch(
          {
            loading: false,
            formStatus: 'signed in',
            isLoggedIn: true,
          },
          'signed in successfully'
        );
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error signing in'
      );
    }
  }

  async signOut() {
    this.pagestore.patch(
      { loading: true, formStatus: 'signin out' },
      'signin out'
    );
    try {
      await this.auth.signOut();
      setTimeout(() => {
        this.pagestore.patch(
          {
            loading: false,
            formStatus: 'signed out',
            uid: undefined,
          },
          'signed out'
        );
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      this.pagestore.patch(
        {
          loading: false,
          formStatus: 'error',
          error: new Error(error as string).message,
          action: 'try again',
        },
        'error signin out'
      );
    }
  }
}
