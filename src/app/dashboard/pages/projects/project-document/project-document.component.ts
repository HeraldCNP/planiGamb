import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { MaterialModule } from '../../../../material/material.module';

@Component({
  selector: 'app-project-document',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-document.component.html',
  styleUrl: './project-document.component.css'
})
export class ProjectDocumentComponent {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  documentForm: any;

  file: File = new File([''], '');
  uploadProgress: number = 0;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  idProject: any;

  constructor() {
    this.idProject = this.activatedRoute.snapshot.params['id'];
    this.documentForm = this.fb.group({
      file: ['']
    })
  }

  ngOnInit(): void {
    // this.getCantones();
  }


  get form() {
    return this.documentForm.controls;
  }

  cancel() {
    this.router.navigate(['/dashboard/projects']);
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];

      console.log(this.file);

    } else {
      console.log("Error al cargar el archivo");
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('documentos', this.file);

    console.log(this.file);
    // Agregar otros campos al FormData aquí
    console.log(this.idProject);

    this.projectService.addArchivo(formData, this.idProject).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total);

      } else if (event.type === HttpEventType.Response) {
        this.snackBar.open('Documento añadido correctamente', 'Cerrar', {
          duration: 3 * 1000
        });
        this.router.navigate(['dashboard/projects']);
      }
    }, (error) => {
      this.snackBar.open(error.error.message, 'Cerrar', { duration: 3 * 1000 });
    });

  }

}
