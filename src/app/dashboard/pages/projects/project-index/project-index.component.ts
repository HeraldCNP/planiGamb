import { Component, ViewChild, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-index',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.css'
})
export class ProjectIndexComponent {

  constructor(private matDialog: MatDialog) {

  }

  private projectService = inject(ProjectService)
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  displayedColumn: string[] = ['gestion', 'codigoSisin', 'codigoProyecto', 'nombreProyecto', 'detalle', 'costo', 'empresa', 'contactoEmpresa', 'supervisor', 'lugar', 'estante', 'fila', 'observaciones', 'fichaTecnica', 'documentos', 'itcp', 'fichaAmbiental', 'plano', 'documentosDigital', 'acciones'];
  dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  projects = signal<any>(null);
  
  cantidad: number = 0;


  loadProjects() {
    this.projectService.getAllCarpetas()
      .subscribe({
        next: (data: any) => {
          console.log('Carpetas', data);
          this.cantidad = data.totalDocuments;
          this.projects.set(data.carpetas);
          this.dataSource = new MatTableDataSource(this.projects());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: any | undefined) => {
          console.log(error.error.message);
          this._snackBar.open(error.error.message, 'Cerrar', { duration: 3 * 1000 });
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProject(){
    this.router.navigate(['dashboard/projects/create']);
  }

}

