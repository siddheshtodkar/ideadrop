import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { authObjectAction } from './store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  store = inject(Store)
  authService = inject(AuthService)
  title = 'ideadrop';
  ngOnInit() {
    this.authService.refresh().subscribe(data => {
      this.store.dispatch(authObjectAction(data))
    }, err => {
      console.log(err);
    })
  }
}
