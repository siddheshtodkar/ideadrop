import { Component } from '@angular/core';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [IdeaCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ideas:any

}
