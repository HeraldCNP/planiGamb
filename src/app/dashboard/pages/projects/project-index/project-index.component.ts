import { AfterViewInit, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
import { ProjectDetalleComponent } from '../components/project-detalle/project-detalle.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-index',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.css'
})
export class ProjectIndexComponent implements OnInit, AfterViewInit {

  constructor(private matDialog: MatDialog) {

  }

  projects = signal<any>(null);
  cantidad: number = 0;

  public readonly baseUrl: string = environment.baseUrl;

  private projectService = inject(ProjectService)
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  displayedColumns: string[] = ['acciones', 'gestion', 'codigoSisin', 'codigoProyecto', 'nombreProyecto', 'detalle', 'costo', 'empresa', 'lugar', 'estante', 'fila', 'fichaTecnica', 'documentos'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }





  ngOnInit() {
    this.loadProjects();
  }


  loadProjects() {
    this.projectService.getProjects()
      .subscribe({
        next: (data: any) => {
          console.log('Proyectos', data);
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
  
  verDetalle(id: any) {
    this.openDialog(id, 'Ver Detalle')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(ProjectDetalleComponent, {
      width: '1000px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        // if (resp == 'edited') {
        //   this.cargarCarpetas('');
        //   Swal.fire('Bien', `Carpeta Editada Correctamente`, 'success')
        // }

        // if (resp == 'created') {
        //   this.flag = '';
        //   this.cargarCarpetas('');
        //   Swal.fire('Bien', `Carpeta Creada Correctamente`, 'success')
        // }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  addArchivo(id:string){
    this.router.navigate(['dashboard/projects/document', id]);
  }

  editProject(id:string){
    this.router.navigate(['dashboard/projects/edit', id]);
  }


  deleteProject(id: any) {
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard/projects']);
            this.loadProjects();
          },
          error: (message: string | undefined) => {
            Swal.fire('Error', message, 'error')
          }
        })
        Swal.fire({
          title: "¡Eliminado!",
          text: "Proyecto ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }



}

