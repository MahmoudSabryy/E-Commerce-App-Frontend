import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly _Auth = inject(Auth);

  private readonly _FormBuilder = inject(FormBuilder);

  private readonly _Router = inject(Router);

  msgError: string = '';

  isLoading: boolean = false;

  msgSuccess: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      confirmPassword: [null],
      gender: [null],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      DOB: [null],
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('confirmPassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._Auth.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success == true) {
            this.msgSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/login']);
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
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
}
