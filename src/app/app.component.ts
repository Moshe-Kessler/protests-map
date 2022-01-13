import { Component, OnInit } from '@angular/core';

import { CustomIconService } from './layout/custom-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'protests-map';
  constructor(private customIcon: CustomIconService) {}
  ngOnInit(): void {
    this.customIcon.init();
  }
}
