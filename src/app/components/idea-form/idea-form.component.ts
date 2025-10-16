import { Component, inject, signal } from '@angular/core';
import { FormArray, Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea-form',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.css'
})
export class IdeaFormComponent {
  route = inject(ActivatedRoute)
  formBuilder = inject(NonNullableFormBuilder)
  ideaService = inject(IdeaService)
  editFlag = signal<boolean>(false)
  isPending = signal<boolean>(false)
  ideaId = this.route.snapshot.paramMap.get('id')
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
    if (this.ideaForm.valid)
      this.ideaService.createIdea(this.ideaForm.getRawValue()).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  ngOnInit() {
    if (this.ideaId)
      this.editFlag.set(true)
  }
}
