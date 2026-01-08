import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Userservices } from '../../core/services/userservices';
import { IUser } from '../../core/interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-blank.html',
  styleUrl: './nav-blank.css',
})
export class NavBlank implements OnInit {
  readonly _Auth = inject(Auth);

  user!: IUser;
  private readonly _Userservices = inject(Userservices);

  ngOnInit(): void {
    this._Userservices.getUserData().subscribe({
      next: (res) => {
        console.log(res.data);
      },
    });
  }
}
