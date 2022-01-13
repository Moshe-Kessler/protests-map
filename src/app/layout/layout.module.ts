import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider/divider.component';
import { ErrorBarComponent } from './error-bar/error-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [NavbarComponent, ErrorBarComponent, DividerComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [NavbarComponent, ErrorBarComponent, DividerComponent],
})
export class LayoutModule {}
