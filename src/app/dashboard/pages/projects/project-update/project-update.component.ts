import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectYearComponent } from '../../../../components/select-year/select-year.component';
import { LoaderDirective } from '../../../../directives/loader.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { Project } from '../../../interfaces/project';

@Component({
  selector: 'app-project-update',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SelectYearComponent, FormsModule, LoaderDirective],
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  editForm: any;

  file: File = new File([''], '');
  uploadProgress: number = 0;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  idProject: any;
  project: any;

  cantones = signal<any[]>([]);
  selectedCanton = signal<string | null>(null);
  subcentrales = computed(() => {
    const cantonId = this.selectedCanton();
    const canton = this.cantones().find(c => c.canton === cantonId);
    console.log(canton);

    return canton ? canton.subcentralias : [];
  });
  programas = signal<any[]>([]);

  selectedSubcentral = signal<string | null>(null);
  comunidades = computed(() => {
    const subcentralId = this.selectedSubcentral();
    console.log(subcentralId);

    const subcentral = this.subcentrales().find((s: any) => s.subcentralia === subcentralId);
    return subcentral ? subcentral.comunidades : [];
  });

  constructor() {
    this.idProject = this.activatedRoute.snapshot.params['id'];

    this.projectService.getProjectForId(this.idProject).subscribe({
      next: (data: any) => {
        console.log(data);
        this.project = data;
        this.editForm.patchValue({
          canton: this.project.canton,
          subcentralia: this.project.subcentralia,
          comunidad: this.project.comunidad,
          gestion: this.project.gestion,
          codigoSisin: this.project.codigoSisin,
          programa: this.project.programa ? this.project.programa._id : '',
          estado: this.project.estado,
          tipoProyecto: this.project.tipoProyecto,
          nombreProyecto: this.project.nombreProyecto,
          tipoEstudio: this.project.tipoEstudio,
          plazo: this.project.plazo,
          detalle: this.project.detalle,
          costo: this.project.costo,
          empresa: this.project.empresa,
          contactoEmpresa: this.project.contactoEmpresa,
          supervisor: this.project.supervisor,
          lugar: this.project.lugar,
          estante: this.project.estante,
          fila: this.project.fila,
          observaciones: this.project.observaciones,
          itcp: this.project.itcp,
          fichaAmbiental: this.project.fichaAmbiental,
          plano: this.project.plano,
        })
      },
      error: (message: any | undefined) => {
        console.log(message.error.message);
        // Swal.fire('Error', message.error.message, 'error')
      }
    })


    this.editForm = this.fb.group({
      canton: ['', Validators.required],
      subcentralia: ['', Validators.required],
      comunidad: ['', Validators.required],
      gestion: ['', Validators.required],
      codigoSisin: [''],
      programa: ['', [Validators.required]],
      estado: ['',],
      tipoProyecto: ['', [Validators.required]],
      nombreProyecto: ['', [Validators.required]],
      tipoEstudio: ['', [Validators.required]],
      plazo: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      costo: [''],
      empresa: [''],
      contactoEmpresa: [''],
      supervisor: [''],
      lugar: [''],
      estante: [''],
      fila: [''],
      observaciones: [''],
      fichaTecnica: [''],
      itcp: [''],
      fichaAmbiental: [''],
      plano: [''],
    })
  }

  ngOnInit(): void {
    this.getCantones();
    this.getProgramas();
  }


  getCantones(): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService.getCantones().subscribe({
      next: (response) => {
        this.cantones.set(response);
        this.loading.set(false);
        console.log(response);

      },
      error: (err) => {
        this.error.set('Error fetching data');
        this.loading.set(false);
      }
    });
  }

  get form() {
    return this.editForm.controls;
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    } else {
      console.log("Error al cargar el archivo");
    }
  }

  getProgramas(): void {
    this.error.set(null);
    this.projectService.getProgramas().subscribe({
      next: (response) => {
        this.programas.set(response);
        console.log('programas', response);
      },
      error: (err) => {
        this.error.set('Error fetching data');
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/projects']);
  }


  onSubmit() {
    if (this.editForm.valid) {
      const formData = new FormData();

      if (this.file) {
        formData.append('fichaTecnica', this.file);
      }

      // Agregar otros campos al FormData aquí
      formData.append('canton', this.editForm.get('canton').value ? this.editForm.get('canton').value : '');
      formData.append('subcentralia', this.editForm.get('subcentralia').value ? this.editForm.get('subcentralia').value : '');
      formData.append('comunidad', this.editForm.get('comunidad').value ? this.editForm.get('comunidad').value : '');
      formData.append('gestion', this.editForm.get('gestion').value ? this.editForm.get('gestion').value : '');
      formData.append('codigoSisin', this.editForm.get('codigoSisin').value ? this.editForm.get('codigoSisin').value : '');
      formData.append('programa', this.editForm.get('programa').value ? this.editForm.get('programa').value : '');
      formData.append('estado', this.editForm.get('estado').value ? this.editForm.get('estado').value : '');
      formData.append('tipoProyecto', this.editForm.get('tipoProyecto').value ? this.editForm.get('tipoProyecto').value : '');
      formData.append('nombreProyecto', this.editForm.get('nombreProyecto').value ? this.editForm.get('nombreProyecto').value : '');
      formData.append('tipoEstudio', this.editForm.get('tipoEstudio').value ? this.editForm.get('tipoEstudio').value : '');
      formData.append('plazo', this.editForm.get('plazo').value ? this.editForm.get('plazo').value : 0);
      formData.append('detalle', this.editForm.get('detalle').value ? this.editForm.get('detalle').value : '');
      formData.append('costo', this.editForm.get('costo').value ? this.editForm.get('costo').value : 0);
      formData.append('empresa', this.editForm.get('empresa').value ? this.editForm.get('empresa').value : '');
      formData.append('contactoEmpresa', this.editForm.get('contactoEmpresa').value ? this.editForm.get('contactoEmpresa').value : '');
      formData.append('supervisor', this.editForm.get('supervisor').value ? this.editForm.get('supervisor').value : '');
      formData.append('lugar', this.editForm.get('lugar').value ? this.editForm.get('lugar').value : '');
      formData.append('estante', this.editForm.get('estante').value ? this.editForm.get('estante').value : '');
      formData.append('fila', this.editForm.get('fila').value ? this.editForm.get('fila').value : '');
      formData.append('observaciones', this.editForm.get('observaciones').value ? this.editForm.get('observaciones').value : '');
      formData.append('itcp', this.editForm.get('itcp').value ? this.editForm.get('itcp').value : 'false');
      formData.append('fichaAmbiental', this.editForm.get('fichaAmbiental').value ? this.editForm.get('fichaAmbiental').value : 'false');
      formData.append('plano', this.editForm.get('plano').value ? this.editForm.get('plano').value : 'false');

      this.projectService.updateProject(formData, this.idProject).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);

        } else if (event.type === HttpEventType.Response) {
          this.snackBar.open('Archivo PDF y otros campos Editados correctamente', 'Cerrar', {
            duration: 2000
          });
          this.router.navigate(['/dashboard/projects']);
        }
      });
    }
    else {
      console.log("Error en formulario");
    }

  }


  // onSubmit(): void {
  //   if (this.editForm.valid) {
  //     const project: Project = {
  //       canton: this.editForm.get('canton').value,
  //       subcentralia: this.editForm.get('subcentralia').value,
  //       comunidad: this.editForm.get('comunidad').value,
  //       gestion: this.editForm.get('gestion').value,
  //       codigoSisin: this.editForm.get('codigoSisin').value,
  //       codigoProyecto: this.editForm.get('codigoProyecto').value,
  //       nombreProyecto: this.editForm.get('nombreProyecto').value,
  //       detalle: this.editForm.get('detalle').value,
  //       costo: this.editForm.get('costo').value,
  //       empresa: this.editForm.get('empresa').value,
  //       contactoEmpresa: this.editForm.get('contactoEmpresa').value,
  //       supervisor: this.editForm.get('supervisor').value,
  //       lugar: this.editForm.get('lugar').value,
  //       estante: this.editForm.get('estante').value,
  //       fila: this.editForm.get('fila').value,
  //       observaciones: this.editForm.get('observaciones').value,
  //       fichaTecnica: '',  // Esto se maneja como archivo
  //       itcp: this.editForm.get('itcp').value,
  //       fichaAmbiental: this.editForm.get('fichaAmbiental').value,
  //       plano: this.editForm.get('plano').value,
  //       documentosDigital: false,  // Suponiendo que se establece en otro lugar
  //       documentos: '',  // Suponiendo que se establece en otro lugar
  //     };

  //     const formData = this.convertProjectToFormData(project);

  //     if (this.file) {
  //       formData.append('fichaTecnica', this.file);
  //     }

  //     this.projectService.updateProject(formData, this.idProject).subscribe((event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.uploadProgress = Math.round(100 * event.loaded / event.total);
  //       } else if (event.type === HttpEventType.Response) {
  //         this.snackBar.open('Archivo PDF y otros campos editados correctamente', 'Cerrar', {
  //           duration: 2000
  //         });
  //         this.router.navigate(['/dashboard/projects']);
  //       }
  //     });
  //   } else {
  //     console.log('Error en formulario');
  //   }
  // }

  // private convertProjectToFormData(project: Project): FormData {
  //   const formData = new FormData();
  //   for (const key in project) {
  //     if (project.hasOwnProperty(key)) {
  //       let value = (project as any)[key];
  //       if (typeof value === 'boolean') {
  //         value = value.toString();
  //       } 
  //       formData.append(key, value);
  //     }
  //   }
  //   return formData;
  // }




}
