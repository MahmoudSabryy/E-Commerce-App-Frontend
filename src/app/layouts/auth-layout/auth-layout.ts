import { Component } from '@angular/core';
import { NavAuth } from '../../components/nav-auth/nav-auth';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-auth-layout',
  imports: [NavAuth, RouterOutlet, Footer],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
