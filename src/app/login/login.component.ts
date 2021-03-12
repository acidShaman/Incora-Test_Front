import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.auth.login(this.loginForm.value).subscribe( value =>
      value[0] === 'Logged In' ? this.router.navigate(['feed']) : this.loginForm.setErrors({invalid_credentials: true}),
      error => this.loginForm.setErrors({invalid_credentials: true}));
    console.log(this.loginForm.value);
  }
}
