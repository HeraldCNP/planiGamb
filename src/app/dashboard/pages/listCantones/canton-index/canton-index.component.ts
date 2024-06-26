import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormCantonComponent } from '../components/form-canton/form-canton.component';
import { FormSubcentralComponent } from '../components/form-subcentral/form-subcentral.component';
import { FormComunidadComponent } from '../components/form-comunidad/form-comunidad.component';

@Component({
  selector: 'app-canton-index',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './canton-index.component.html',
  styleUrl: './canton-index.component.css'
})
export class CantonIndexComponent implements OnInit {
  cantones = signal<any[]>([]);
  subcentralias = signal<any[]>([]);
  comunidades = signal<any[]>([]);
  secciones = signal<any[]>([]);
  cantidad  = 0;
  selectedCanton: any;
  selectedSubcrentalia: any;
  selectedComunidad: any;


  private projectService = inject(ProjectService)
  // private router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  displayedColumns: string[] = ['canton', 'numHabitantes', 'acciones'];
  displayedColumns1: string[] = ['subcentral', 'numHabitantes', 'acciones'];
  displayedColumns2: string[] = ['comunidad', 'numHabitantes', 'acciones'];
  displayedColumns3: string[] = ['seccion'];

  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog){

  }

  ngOnInit() {
    this.getCantones();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCantones(): void {
    this.projectService.getCantones().subscribe({
      next: (response) => {
        this.cantones.set(response);
        console.log('cantones', this.cantones());
        this.cantidad = response.length;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  loadSubcentralias(cantonId: string): void {
    const canton = this.cantones().find(c => c._id === cantonId);
    if (canton) {
      this.selectedCanton = canton.canton;
      this.subcentralias.set(canton.subcentralias);
      console.log('subcentralias', this.subcentralias());
      this.dataSource1.data = this.subcentralias();
    }
  }

  loadComunidades(subCentralId: string): void {
    const subCentral = this.subcentralias().find(c => c._id === subCentralId);
    if (subCentral) {
      console.log(subCentral);
      
      this.selectedSubcrentalia = subCentral.subcentralia;
      this.comunidades.set(subCentral.comunidades);
      console.log('comunidades', this.comunidades());
      this.dataSource2.data = this.comunidades();
    }
  }

  loadSecciones(seccionId: string): void {
    const seccion = this.comunidades().find(c => c._id === seccionId);
    if (seccion) {
      console.log(seccion);
      
      this.selectedComunidad = seccion.comunidad;
      this.secciones.set(seccion.secciones);
      console.log('secciones', this.secciones());
      this.dataSource3.data = this.secciones();
    }
  }


  createCanton() {
    this.openDialog(0, 'Crear Canton')
  }

  editCanton(id: string){
    this.openDialog(id, 'Editar Canton')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormCantonComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
           
          this.getCantones();
          this._snackBar.open('Canton Editado Correctamente', 'Cerrar', { duration: 3000 });
        }

        if(resp == 'created'){ 
          this.getCantones();
          this._snackBar.open('Canton Creado Correctamente', 'Cerrar', { duration: 3000 });
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  createSubcentral() {
    this.openDialog1(0, 'Crear Subcentralia')
  }

  editSubcentral(id: string){
    this.openDialog1(id, 'Editar Subcentralia')
  }

  openDialog1(id: any, title: any) {
    let dialog = this.matDialog.open(FormSubcentralComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
           
          this.getCantones();
          this._snackBar.open('Subcentralia Editada Correctamente', 'Cerrar', { duration: 3000 });
        }

        if(resp == 'created'){ 
          this.getCantones();
          this._snackBar.open('Subcentralia Creada Correctamente', 'Cerrar', { duration: 3000 });
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  createComunidad() {
    this.openDialog2(0, 'Crear Comunidad')
  }

  editComunidad(id: string){
    this.openDialog2(id, 'Editar Subcentralia')
  }

  openDialog2(id: any, title: any) {
    let dialog = this.matDialog.open(FormComunidadComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
           
          this.getCantones();
          this._snackBar.open('Comunidad Editada Correctamente', 'Cerrar', { duration: 3000 });
        }

        if(resp == 'created'){ 
          this.getCantones();
          this._snackBar.open('Comunidad Creada Correctamente', 'Cerrar', { duration: 3000 });
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

}
