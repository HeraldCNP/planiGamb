import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { SelectYearComponent } from '../../../../components/select-year/select-year.component';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SelectYearComponent],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private snackBar =inject(MatSnackBar);
  private router =inject(Router);

  projectForm:  any;

  file: File = new File([''], '');
  uploadProgress: number = 0;

  constructor() {
    this.projectForm = this.fb.group({
      gestion: ['', Validators.required],
      codigoSisin: [''],
      codigoProyecto: ['', [Validators.required]],
      nombreProyecto: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      contactoEmpresa: ['', [Validators.required]],
      supervisor: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      estante: ['', [Validators.required]],
      fila: ['', [Validators.required]],
      observaciones: [''],

    })
  }

  get form(){
    return this.projectForm.controls;
  }


  cancel() {  
    this.router.navigate(['/dashboard/projects']);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    }
  }

  selectFile(event:any){
    this.projectForm.get('file')?.setValue(this.file);
  }

}

