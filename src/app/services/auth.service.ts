import { Injectable } from '@angular/core';
import {BehaviorSubject, of, throwError} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): any {
    credentials.username = credentials.username.toLowerCase();
    return this.http.post('http://localhost:8000/login/', credentials);
  }

  logout(): void {
    this.$isLoggedIn.next(false);
  }
}
