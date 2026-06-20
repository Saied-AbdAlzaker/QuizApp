import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',title:'Quizwiz', component: LoginComponent },
  { path: 'register',title:'Quizwiz', component: RegisterComponent },
  { path: 'forgetPassword',title:'Quizwiz', component: ForgetPasswordComponent },
  { path: 'resetPassword',title:'Quizwiz', component: ResetPasswordComponent },
  { path: 'changePassword',title:'Quizwiz', component: ChangePasswordComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
