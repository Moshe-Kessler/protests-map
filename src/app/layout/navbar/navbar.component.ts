import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$?: Observable<boolean>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }

  signOut() {
    this.userService.signOut();
  }
}
