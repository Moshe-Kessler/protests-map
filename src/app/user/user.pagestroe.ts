import { Injectable } from '@angular/core';
import { PagestoreAbstract } from '../core/pagestore.abstract';
import type { UserState } from './user.state';

@Injectable({
  providedIn: 'root',
})
export class UserPagestore extends PagestoreAbstract<UserState> {
  protected pagestore = 'user';
  constructor() {
    super({
      loading: true,
      uid: undefined,
      error: undefined,
      action: undefined,
    });
  }
}
