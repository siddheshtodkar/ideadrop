import { Component, inject } from '@angular/core';
import { IdeaCardComponent } from '../idea-card/idea-card.component';
import { AsyncPipe } from '@angular/common';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea-list',
  imports: [IdeaCardComponent, AsyncPipe],
  templateUrl: './idea-list.component.html',
  styleUrl: './idea-list.component.css'
})
export class IdeaListComponent {
  ideaSrvice = inject(IdeaService)
  ideas$ = this.ideaSrvice.fetchIdeas()
}
