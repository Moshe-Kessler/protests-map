import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FlagFormComponent } from './flag-form/flag-form.component';
import { FlagsPageComponent } from './flags-page/flags-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LayoutModule } from '../layout/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FlagFormComponent, FlagsPageComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
})
export class FlagModule {}
