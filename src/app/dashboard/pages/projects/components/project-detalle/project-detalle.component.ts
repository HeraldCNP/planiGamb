import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../../services/project.service';
import { NgxPrintModule } from 'ngx-print';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-project-detalle',
  standalone: true,
  imports: [MaterialModule, NgxPrintModule],
  templateUrl: './project-detalle.component.html',
  styleUrl: './project-detalle.component.css'
})
export class ProjectDetalleComponent implements OnInit {
  private projectService = inject(ProjectService);
  private readonly baseUrl: string = environment.baseUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ProjectDetalleComponent>) {

  }
  inputData: any;
  project = signal<any>(null);
  loading = signal<boolean>(false);
  date = new Date();
  projectUrl = '';
  projectData: any;


  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;

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

  getProjectInfo() {
    this.projectService.getInfoProject(this.inputData.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }







}
