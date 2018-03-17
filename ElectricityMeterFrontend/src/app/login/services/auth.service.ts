import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import * as moment from 'moment';
import { User } from '../../data/user/user.class';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService implements  OnDestroy {

  private stop$: Subject<any>;

  constructor(private http: HttpClient) {
    this.stop$ = new Subject<any>();
  }

  login(username: string, password: string ) {
    return this.http.post<any>('authenticate', {name: username, password: password})
      .takeUntil(this.stop$)
      .do(e => this.setSession(e))
      .shareReplay();
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();
    this.stop$.unsubscribe();
  }

  private setSession(authResult) {
    if (authResult.id_token && authResult.expires_at) {
      localStorage.setItem('id_token', authResult.id_token);
      localStorage.setItem('expires_at', JSON.stringify(authResult.expires_at) );
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
