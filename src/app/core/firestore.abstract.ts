import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class FirestoreAbstract<T> {
  protected abstract basePath: string;
  constructor(
    @Inject(AngularFirestore) protected firestore: AngularFirestore
  ) {}

  doc$(id: string) {
    return this.firestore
      .doc<T>(`${this.basePath}/${id}`)
      .valueChanges()
      .pipe(
        tap((r: T | undefined) => {
          if (!environment.production) {
            console.groupCollapsed(
              `Firestore Streaming [${this.basePath}] [doc$] ${id}`
            );
            console.log(r);
            console.groupEnd();
          }
        })
      );
  }

  collection$(queryFn?: QueryFn) {
    return this.firestore
      .collection<T>(`${this.basePath}`, queryFn)
      .valueChanges()
      .pipe(
        tap((r: T[]) => {
          if (!environment.production) {
            console.groupCollapsed(
              `Firestore Streaming [${this.basePath}] [collection$]`
            );
            console.table(r);
            console.groupEnd();
          }
        })
      );
  }

  async update(value: T, id: string) {
    try {
      await this.collection.doc(id).set(Object.assign({}, { id }, value));
      if (!environment.production) {
        console.groupCollapsed(`Firestore Service [${this.basePath}] [update]`);
        console.log('[Id]', id, value);
        console.groupEnd();
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async create(value: T) {
    try {
      const id = this.firestore.createId();
      const document = Object.assign({}, { id }, value);
      await this.collection.doc(id).set(document);
      if (!environment.production) {
        console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`);
        console.log('[Id]', id, value);
        console.groupEnd();
      }
      return document;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async delete(id: string) {
    try {
      await this.collection.doc(id).delete();
      if (!environment.production) {
        console.groupCollapsed(`Firestore Service [${this.basePath}] [delete]`);
        console.log('[Id]', id);
        console.groupEnd();
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private get collection() {
    return this.firestore.collection(`${this.basePath}`);
  }
}
