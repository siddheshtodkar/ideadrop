import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { IdeaFormComponent } from './components/idea-form/idea-form.component';
import { IdeaPageComponent } from './components/idea-page/idea-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'ideas', component: IdeaListComponent },
  { path: 'ideas/new', component: IdeaFormComponent },
  { path: 'ideas/:id', component: IdeaPageComponent }
];
