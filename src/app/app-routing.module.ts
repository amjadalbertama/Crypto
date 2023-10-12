import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modal/login/login.component';
import { RegisterComponent } from './modal/register/register.component';
import { ValidationAccountComponent } from './modal/validation-account/validation-account.component';
import { ProfileComponent } from './setting/profile/profile.component';

import { AuthGuard } from './service/auth-guard';
import { StatmentPageComponent } from './pages/statment-page/statment-page.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'statement', component: StatmentPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'validation', component: ValidationAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'setting/profile', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
