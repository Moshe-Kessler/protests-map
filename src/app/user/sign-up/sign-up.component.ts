import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormErrorStateMatcher } from 'src/app/layout/form-error-state-matcher';
import type { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  matcher = new FormErrorStateMatcher();
  hide = true;
  loading$?: Observable<boolean>;
  isLoggedIn$?: Observable<boolean>;
  uid$?: Observable<string>;
  error$?: Observable<string | undefined>;
  action$?: Observable<string | undefined>;

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading$ = this.userService.loading$;
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.uid$ = this.userService.uid$;
    this.error$ = this.userService.error$;
    this.action$ = this.userService.action$;
  }
  getPass(): string {
    return this.signUpForm.value.password;
  }

  isMatch() {
    return (
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    );
  }

  signUpWithEmailAndPassword() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.userService.signUpWithEmailAndPassword(email, password);
  }

  signUpWithGoogle() {
    this.userService.signInWithGoogle();
  }

  signUpAnonymously() {
    this.userService.signUpAnonymously();
  }
}
