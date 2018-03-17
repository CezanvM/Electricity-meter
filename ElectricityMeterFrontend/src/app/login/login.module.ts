import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService, AuthGuardService]
})
export class LoginModule { }
