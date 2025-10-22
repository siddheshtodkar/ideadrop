import { Component, inject, signal } from '@angular/core';
import { FormArray, Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { toast } from 'ngx-sonner';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-form',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.css'
})
export class IdeaFormComponent {
  route = inject(ActivatedRoute)
  router = inject(Router)
  formBuilder = inject(NonNullableFormBuilder)
  ideaService = inject(IdeaService)
  editFlag = signal<boolean>(false)
  isPending = signal<boolean>(false)
  submitted = signal<boolean>(false)
  ideaId = this.route.snapshot.paramMap.get('id')
  idea$ = this.ideaService.fetchIdea(this.ideaId || '')
  subscriptions: Subscription[] = []
  ideaForm = this.formBuilder.group({
    title: ['', Validators.required],
    summary: ['', Validators.required],
    description: ['', Validators.required],
    tags: this.formBuilder.array([this.formBuilder.control('')])
  })
  get title() {
    return this.ideaForm.get('title')
  }
  get summary() {
    return this.ideaForm.get('summary')
  }
  get description() {
    return this.ideaForm.get('description')
  }
  get tags() {
    return this.ideaForm.get('tags') as FormArray
  }
  addTag() {
    this.tags.push(this.formBuilder.control(''))
  }
  removeTag(index: number) {
    this.tags.removeAt(index)
  }
  submit() {
    this.submitted.set(true)
    console.log(this.ideaForm.getRawValue())
    if (this.ideaForm.valid) {
      if (this.editFlag()) {
        this.subscriptions.push(this.ideaService.updateIdea(this.ideaId!, this.ideaForm.getRawValue()).subscribe(data => {
          toast.success('Idea Updated Successfully')
          this.router.navigateByUrl('/ideas')
        }, err => {
          toast.error(err.message)
        }))
      }
      else {
        this.subscriptions.push(this.ideaService.createIdea(this.ideaForm.getRawValue()).subscribe(data => {
          toast.success('Idea Created Successfully')
          this.router.navigateByUrl('/ideas')
        }, err => {
          toast.error(err.message)
        }))
      }
    }
  }
  ngOnInit() {
    if (this.ideaId) {
      this.editFlag.set(true)
      this.subscriptions.push(this.idea$.subscribe(data => {
        this.ideaForm.patchValue(data)
        this.tags.clear()
        data.tags.forEach(tag => this.tags.push(this.formBuilder.control(tag)))
      }, err => {
        toast.error(err.message)
      }))
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
