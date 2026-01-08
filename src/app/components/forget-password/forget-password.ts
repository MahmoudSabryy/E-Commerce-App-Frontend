import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  step: number = 1;

  email!: string;

  private readonly _Auth = inject(Auth);

  private readonly _Router = inject(Router);

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyOtp: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    otp: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  verifyEmailSubmit(): void {
    this.email = this.verifyEmail.value.email;
    console.log(this.email);

    this._Auth.verifyEmailForm(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifyOtpSubmit(): void {
    this._Auth.verifyOtpForm(this.verifyOtp.value).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetPasswordSubmit(): void {
    this._Auth.changeForgetPasswordForm(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.status === true) {
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
