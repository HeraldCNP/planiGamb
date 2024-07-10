import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-project-create2',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-create2.component.html',
  styleUrl: './project-create2.component.css'
})
export class ProjectCreate2Component {
  isLinear = true;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      step1: this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      }),
      step3: this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      })
    });
  }
 
  
  get step1() {
    return this.form.get('step1') as FormGroup;
  }

  get step2() {
    return this.form.get('step2') as FormGroup;
  }

  get step3() {
    return this.form.get('step3') as FormGroup;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes manejar el envío del formulario
    }
  }

}
