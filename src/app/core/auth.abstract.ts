import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export abstract class AuthAbstract {
  constructor(@Inject(AngularFireAuth) protected auth: AngularFireAuth) {}

  get user$() {
    return this.auth.user;
  }
  signInWithPopup() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }
  signInWithEmailAndPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  signInAnonymously() {
    return this.auth.signInAnonymously();
  }
  signOut() {
    return this.auth.signOut();
  }
}
