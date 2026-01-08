import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [RouterLink],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {
  private _Router = inject(Router);

  goBack(): void {
    window.history.length > 1 ? window.history.back() : this._Router.navigate(['/']);
  }
}
