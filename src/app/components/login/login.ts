import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import {
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly _Auth = inject(Auth);

  private readonly _FormBuilder = inject(FormBuilder);

  private readonly _Router = inject(Router);

  msgError: string = '';

  isLoading: boolean = false;

  msgSuccess: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._Auth.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success == true) {
            this.msgSuccess = true;

            localStorage.setItem('userToken', res.token);

            this._Auth.saveUserData();

            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 2000);
          }

          console.log(res);

          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.error;
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
}
