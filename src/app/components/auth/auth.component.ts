import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { authObjectAction } from '../../store/actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authService = inject(AuthService)
  router = inject(Router)
  store = inject(Store)
  error = signal<string | null>(null)
  isLogin = signal<boolean>(false)
  isPending = signal<boolean>(false)
  credentials = new Credentials('', '', '')
  subscription: Subscription | null = null
  submit() {
    this.isPending.set(true)
    if (this.isLogin()) 
      delete this.credentials.name
    this.subscription = this.authService[this.isLogin() ? 'login' : 'register'](this.credentials).subscribe(data => {
      this.store.dispatch(authObjectAction(data))
      this.isPending.set(false)
      this.router.navigateByUrl('/ideas')
    }, (err: HttpErrorResponse) => {
      this.error.set(err.error.message)
      this.isPending.set(false)
    })
  }
  ngOnInit() {
    this.isLogin.set(this.router.url.includes('login'))
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}

class Credentials {
  constructor(
    public email: string,
    public password: string,
    public name?: string
  ) { }
}