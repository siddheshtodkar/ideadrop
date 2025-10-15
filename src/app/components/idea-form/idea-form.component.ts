import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-idea-form',
  imports: [RouterLink],
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.css'
})
export class IdeaFormComponent {
  editFlag = signal<boolean>(false)
  route = inject(ActivatedRoute)
  isPending = signal<boolean>(false)
  ideaId = this.route.snapshot.paramMap.get('id')
  ngOnInit() {
    if (this.ideaId)
      this.editFlag.set(true)
  }
}
