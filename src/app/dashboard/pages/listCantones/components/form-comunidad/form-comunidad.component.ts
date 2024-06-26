import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CantonService } from '../../../../services/canton.service';
import { ProjectService } from '../../../../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../material/material.module';

@Component({
  selector: 'app-form-comunidad',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './form-comunidad.component.html',
  styleUrl: './form-comunidad.component.css'
})
export class FormComunidadComponent {
  private fb = inject(FormBuilder);
  private cantonService = inject(CantonService);
  private projectService = inject(ProjectService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormComunidadComponent>) {

  }

  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  public comunidadForm: FormGroup = this.fb.group({
    subcentralia: ['', [Validators.required]],
    comunidad: ['', [Validators.required]],
    numHabitantes: [''],
  })

  subcentralias = signal<any[]>([]);

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.id != 0) {
      this.loadComunidadForId(this.inputData.id);
    }
    this.getSubcentralias();
  }

  get form() {
    return this.comunidadForm.controls;
  }

  getSubcentralias(): void {
    this.projectService.getSubcentralias().subscribe({
      next: (response: any) => {
        this.subcentralias.set(response);
        // console.log('subCentral', this.subcentralias());
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }




  saveComunidad() {
    this.cantonService.createComunidad(this.comunidadForm.value).subscribe({
      next: (resp: any) => {
        this.closeDialog('created');
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  editComunidad(id:any){
    this.cantonService.editComunidad(this.comunidadForm.value, id).subscribe({
      next: (resp: any) => {
        this.closeDialog('edited');
        // console.log("resp",resp);
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }


  loadComunidadForId(id: any) {
    this.cantonService.getComunidadById(id).subscribe(item => {
      this.editData = item;
      console.log(this.editData);
      
      this.comunidadForm.patchValue({
        subcentralia: this.editData.subcentralia._id,
        comunidad: this.editData.comunidad,
        numHabitantes: this.editData.numHabitantes,
      });
    })
  }

}
