import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { authObjectAction } from './store/actions';
import { NgxSonnerToaster, toast } from 'ngx-sonner'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  store = inject(Store)
  authService = inject(AuthService)
  title = 'ideadrop';
  ngOnInit() {
    this.authService.refresh().subscribe(data => this.store.dispatch(authObjectAction(data)))
  }
}
