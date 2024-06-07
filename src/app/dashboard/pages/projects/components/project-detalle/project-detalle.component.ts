import { Component, Inject, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-project-detalle',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './project-detalle.component.html',
  styleUrl: './project-detalle.component.css'
})
export class ProjectDetalleComponent {
  private projectService = inject(ProjectService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ProjectDetalleComponent>) {

  }
  inputData: any;
  project= signal<any>(null);
  loading = signal<boolean>(false);

  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);

    this.projectService.getProjectForId(this.inputData.id).subscribe({
      next: (response) => {
        this.project.set(response);
        this.loading.set(false);
        console.log(response);

      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });

    // this.cargarTipos();
  }







}
