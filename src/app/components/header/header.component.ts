import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { authObjectAction } from '../../store/actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  store = inject(Store)
  authService = inject(AuthService)
  router = inject(Router)
  user$ = this.store.select(userSelector)
  logout() {
    this.authService.logout().subscribe()
    this.store.dispatch(authObjectAction({ user: null, accessToken: null }))
    this.router.navigateByUrl('/')
  }
}
