import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {

  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private snackBar =inject(MatSnackBar);
  private router =inject(Router);

  projectForm:any;

  file: File = new File([''], '');
  uploadProgress: number = 0;

  constructor() {
    this.projectForm = this.fb.group({
      file: [''],
      numero: ['', [Validators.required]],
    })
  }


}

