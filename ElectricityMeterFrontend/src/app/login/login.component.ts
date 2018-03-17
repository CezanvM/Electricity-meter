import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../data/user/user.class';
import {SweetAlertService} from 'ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  isLoggedIn: boolean;

  constructor(public authService: AuthService, private fb: FormBuilder, private alertService: SweetAlertService) {
    this.user = new User();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      this.authService.login(this.user.username, this.user.password)
        .subscribe(e => {
          this.isLoggedIn = this.authService.isLoggedIn();
          if (!this.isLoggedIn) {
            this.alertService.error({ title: 'Error!', text: 'error logging in'});
          }
      }, (err) => this.alertService.error({ title: 'Error!', text: 'error logging in'}));
    }
  }

}
