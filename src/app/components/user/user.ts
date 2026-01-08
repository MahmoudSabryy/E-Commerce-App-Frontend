import { Component, inject, OnInit } from '@angular/core';
import { Userservices } from '../../core/services/userservices';
import { IUser } from '../../core/interfaces/iuser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  private readonly _Userservices = inject(Userservices);

  user: IUser | null = null;

  model: any = {
    userName: '',
    email: '',
    gender: '',
    phone: '',
    DOB: '',
    addresses: {
      homeAddress: { governorate: '', city: '', addressDetails: '' },
      workAddress: { governorate: '', city: '', addressDetails: '' },
    },
  };

  loading = false;
  saving = false;
  successMsg: string | null = null;
  errorMsg: string | null = null;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;

    this._Userservices.getUserData().subscribe({
      next: (res) => {
        this.user = res.data || res;
        this.fillModel();
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load profile';
        this.loading = false;
      },
    });
  }

  fillModel() {
    if (!this.user) return;

    this.model = {
      userName: this.user.userName,
      email: this.user.email,
      gender: this.user.gender ?? '',
      phone: this.user.phone ?? '',
      DOB: this.user.DOB ? new Date(this.user.DOB).toISOString().substring(0, 10) : '',
      addresses: {
        homeAddress: {
          governorate: this.user.addresses?.homeAddress?.governorate ?? '',
          city: this.user.addresses?.homeAddress?.city ?? '',
          addressDetails: this.user.addresses?.homeAddress?.addressDetails ?? '',
        },
        workAddress: {
          governorate: this.user.addresses?.workAddress?.governorate ?? '',
          city: this.user.addresses?.workAddress?.city ?? '',
          addressDetails: this.user.addresses?.workAddress?.addressDetails ?? '',
        },
      },
    };

    console.log('MODEL AFTER PATCH:', this.model);
  }

  onSubmit(): void {
    this.saving = true;

    const payload = {
      userName: this.model.userName,
      gender: this.model.gender,
      phone: this.model.phone,
      DOB: this.model.DOB ? new Date(this.model.DOB) : null,
      addresses: this.model.addresses,
    };

    this._Userservices.updateUserData(payload).subscribe({
      next: (res) => {
        this.successMsg = res.message;
        this.saving = false;
        this.loadProfile();
      },
      error: (err) => {
        this.errorMsg = err.error?.message ?? 'Update failed';
        this.saving = false;
      },
    });
  }
}
