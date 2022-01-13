import { FlagState } from './flag.state';
import { Injectable } from '@angular/core';
import { PagestoreAbstract } from '../core/pagestore.abstract';

@Injectable({
  providedIn: 'root',
})
export class FlagPagestore extends PagestoreAbstract<FlagState> {
  protected pagestore = 'flag';
  constructor() {
    super({
      loading: true,
      formStatus: '',
      flags: [],
      myFlags: [],
      liveFlags: [],
      totalFlags: 0,
      totalLiveFlags: 0,
      totalUserFlags: 0,
    });
  }
}
