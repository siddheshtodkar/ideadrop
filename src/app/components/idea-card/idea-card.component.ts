import { Component, input } from '@angular/core';
import { Idea } from '../../types';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './idea-card.component.html',
  styleUrl: './idea-card.component.css'
})
export class IdeaCardComponent {
  idea = input<Idea>()
  button = input<boolean>(true)
}
