import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.scss'],
})
export class ErrorBarComponent implements OnInit {
  @Input() error?: string;
  @Input() action?: string;
  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.openSnackbar(this.error!, this.action!);
  }

  openSnackbar(error: string, action: string) {
    const snackbarRef = this.snackbar.open(error, action, {
      duration: 5000,
    });
    snackbarRef.onAction().subscribe(() => {
      if (action === 'sign in') {
        window.location.href = '/signin';
      } else {
        window.location.reload();
      }
    });
  }
}
