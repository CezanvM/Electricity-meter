import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../data/user/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = new User();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      this.authService.login(this.user.username, this.user.password).subscribe(e => {
        console.log("logged in");
      });
    }
  }

}
