import { Component, inject, signal } from '@angular/core';
import { FormArray, Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea-form',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
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
  ideaId = this.route.snapshot.paramMap.get('id')
  idea$ = this.ideaService.fetchIdea(this.ideaId || '')
  ideaForm = this.formBuilder.group({
    title: ['', Validators.required],
    summary: ['', Validators.required],
    description: ['', Validators.required],
    tags: this.formBuilder.array([this.formBuilder.control('')])
  })
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
    console.log(this.ideaForm.getRawValue())
    if (this.ideaForm.valid) {
      if (this.editFlag()) {
        this.ideaService.updateIdea(this.ideaId!, this.ideaForm.getRawValue()).subscribe(data => {
          console.log(data);
          this.router.navigateByUrl('/ideas')
        }, err => {
          console.log(err);
        })
      }
      else {
        this.ideaService.createIdea(this.ideaForm.getRawValue()).subscribe(data => {
          console.log(data);
          this.router.navigateByUrl('/ideas')
        }, err => {
          console.log(err);
        })
      }
    }
  }
  ngOnInit() {
    if (this.ideaId) {
      this.editFlag.set(true)
      this.idea$.subscribe(data => {
        this.ideaForm.patchValue(data)
        this.tags.clear()
        data.tags.forEach(tag => this.tags.push(this.formBuilder.control(tag)))
      }, err => {
        console.log(err);
      })
    }
  }
}
