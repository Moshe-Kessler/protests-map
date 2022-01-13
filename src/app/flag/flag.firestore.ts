import { FirestoreAbstract } from '../core/firestore.abstract';
import { Flag } from './flag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagFirestore extends FirestoreAbstract<Flag> {
  protected basePath = 'flags';
}
