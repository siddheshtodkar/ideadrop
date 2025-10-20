import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { userSelector } from '../../store/selectors';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-idea-page',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.css'
})
export class IdeaPageComponent {
  ideaService = inject(IdeaService)
  route = inject(ActivatedRoute)
  store = inject(Store)
  router = inject(Router)
  idea$ = this.ideaService.fetchIdea(this.route.snapshot.paramMap.get('id') || '')
  user$ = this.store.select(userSelector)
  isPending = signal<boolean>(false)
  delete() {
    let confirm = window.confirm('Are you sure you want to delete?')
    if (confirm) {
      this.isPending.set(true)
      this.ideaService.deleteIdea(this.route.snapshot.paramMap.get('id') || '').subscribe(data => {
        this.isPending.set(false)
        toast.success('Idea Deleted Successfully')
        this.router.navigateByUrl('/ideas')
      }, err => {
        toast.error(err.message)
      })
    }
  }
}
