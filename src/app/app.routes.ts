import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { IdeaListComponent } from './components/idea/idea-list/idea-list.component';
import { IdeaFormComponent } from './components/idea/idea-form/idea-form.component';
import { IdeaPageComponent } from './components/idea/idea-page/idea-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  {
    path: 'ideas', children: [
      { path: '', component: IdeaListComponent },
      { path: 'new', component: IdeaFormComponent },
      { path: ':id', component: IdeaPageComponent },
      { path: ':id/edit', component: IdeaFormComponent },
    ]
  },
];
