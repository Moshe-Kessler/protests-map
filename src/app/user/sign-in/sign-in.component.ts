import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormErrorStateMatcher } from 'src/app/layout/form-error-state-matcher';
import type { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoggedIn$?: Observable<boolean>;
  loading$?: Observable<boolean>;
  uid$?: Observable<string>;
  error$?: Observable<string | undefined>;
  action$?: Observable<string | undefined>;

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  hide = true;
  matcher = new FormErrorStateMatcher();
  constructor(private userService: UserService) {}

  signInWithGoogle() {
    this.userService.signInWithGoogle();
  }

  signInWithEmailAndPassword() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.userService.signInWithEmailAndPassword(email, password);
  }

  signInAnonymously() {
    this.userService.signUpAnonymously();
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.loading$ = this.userService.loading$;
    this.uid$ = this.userService.uid$;
    this.error$ = this.userService.error$;
    this.action$ = this.userService.action$;
  }
}
