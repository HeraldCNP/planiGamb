import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { SelectYearComponent } from '../../../../components/select-year/select-year.component';
import { HttpEventType } from '@angular/common/http';
import { LoaderDirective } from '../../../../directives/loader.directive';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SelectYearComponent, FormsModule, LoaderDirective],
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

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  cantones = signal<any[]>([]);
  selectedCanton = signal<string | null>(null);
  subcentrales = computed(() => {
    const cantonId = this.selectedCanton();
    const canton = this.cantones().find(c => c.canton === cantonId);
    console.log(canton);
    
    return canton ? canton.subcentralias : [];
  });
  
  selectedSubcentral = signal<string | null>(null);
  comunidades = computed(() => {
    const subcentralId = this.selectedSubcentral();
    console.log(subcentralId);
    
    const subcentral = this.subcentrales().find((s:any) => s.subcentralia === subcentralId);
    return subcentral ? subcentral.comunidades : [];
  });



  constructor() {
    this.projectForm = this.fb.group({
      canton: ['', Validators.required],
      subcentralia: ['', Validators.required],
      comunidad: ['', Validators.required],
      gestion: ['', Validators.required],
      codigoSisin: [''],
      codigoProyecto: ['', [Validators.required]],
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
  }


  get form(){
    return this.projectForm.controls;
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


  cancel() {  
    this.router.navigate(['/dashboard/projects']);
  }


  onSubmit() {
    if (this.projectForm.valid) {
      const formData = new FormData();

      if(this.file){
        formData.append('fichaTecnica', this.file);
      }

      // Agregar otros campos al FormData aquí
      formData.append('canton', this.projectForm.get('canton').value);
      formData.append('subcentralia', this.projectForm.get('subcentralia').value);
      formData.append('comunidad', this.projectForm.get('comunidad').value);
      formData.append('gestion', this.projectForm.get('gestion').value);
      formData.append('codigoSisin', this.projectForm.get('codigoSisin').value);
      formData.append('codigoProyecto', this.projectForm.get('codigoProyecto').value);
      formData.append('nombreProyecto', this.projectForm.get('nombreProyecto').value);
      formData.append('tipoEstudio', this.projectForm.get('tipoEstudio').value);
      formData.append('plazo', this.projectForm.get('plazo').value);
      formData.append('detalle', this.projectForm.get('detalle').value);
      formData.append('costo', this.projectForm.get('costo').value);
      formData.append('empresa', this.projectForm.get('empresa').value);
      formData.append('contactoEmpresa', this.projectForm.get('contactoEmpresa').value);
      formData.append('supervisor', this.projectForm.get('supervisor').value);
      formData.append('lugar', this.projectForm.get('lugar').value);
      formData.append('estante', this.projectForm.get('estante').value);
      formData.append('fila', this.projectForm.get('fila').value);
      formData.append('observaciones', this.projectForm.get('observaciones').value);
      formData.append('fichaTecnica', this.projectForm.get('fichaTecnica').value);
      formData.append('itcp', this.projectForm.get('itcp').value);
      formData.append('fichaAmbiental', this.projectForm.get('fichaAmbiental').value);
      formData.append('plano', this.projectForm.get('plano').value);


      this.projectService.createProject(formData).subscribe((event:any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);

        } else if (event.type === HttpEventType.Response) {
          this.snackBar.open('Proyecto creado correctamente', 'Cerrar', {
            duration: 2000
          });
          this.router.navigate(['dashboard/projects']);
        }
      });
    }
    else{
      console.log("Error en formulario");
    }
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    } else {
      console.log("Error al cargar el archivo");
    }
  }

}

