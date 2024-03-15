import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthLoginModel } from './model/auth-login.model';
import { AuthRegisterModel } from './model/auth-register.model';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  loginReq: AuthLoginModel = new AuthLoginModel();
  registerReq: AuthRegisterModel = new AuthRegisterModel();
  subscription: Subscription = new Subscription();

  signupForm: FormGroup;
  loginForm: FormGroup;

  hide: boolean = true;
  button: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,}$|^\*{8,}$/
        ),
      ]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=\S+$).{8,}$|^\*{8,}$/
        ),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick() {
    if (this.button) {
      setTimeout(() => {
        this.button = !this.button;
      }, 750);
    } else {
      this.button = !this.button;
    }
  }

  login() {
    console.log(this.loginForm.value);
    this.subscription = this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.openSnackBar('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.openSnackBar(error.error.message);
      },
    });
  }

  register() {
    console.log(this.signupForm.value);
    this.subscription = this.authService
      .register(this.signupForm.value)
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.openSnackBar('Registration successful');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.openSnackBar(error.error.message);
        },
      });
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
