import { Component, inject } from '@angular/core';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IdeaService } from '../../services/idea.service';


@Component({
  selector: 'app-home',
  imports: [IdeaCardComponent, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ideaService = inject(IdeaService)
  ideas$ = this.ideaService.fetchIdeas(3)
}
