import { RouterModule, Routes } from '@angular/router';

import { FlagFormComponent } from './flag/flag-form/flag-form.component';
import { FlagsPageComponent } from './flag/flags-page/flags-page.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: FlagFormComponent },
  { path: 'flags', component: FlagsPageComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
