import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CantonService } from '../../../../services/canton.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../material/material.module';

@Component({
  selector: 'app-form-canton',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './form-canton.component.html',
  styleUrl: './form-canton.component.css'
})
export class FormCantonComponent {
  private fb = inject(FormBuilder);
  private cantonService = inject(CantonService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormCantonComponent>) {

  }

  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  public cantonForm: FormGroup = this.fb.group({
    canton: ['', [Validators.required]],
    numHabitantes: [''],
  })

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.id != 0){
      this.loadCantonForId(this.inputData.id);
    }
    // this.cargarTipos();
  }

  

  get form() {
    return this.cantonForm.controls;
  }



  saveCanton() {
    this.cantonService.createCanton(this.cantonForm.value).subscribe({
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

  editCanton(id:any){
    this.cantonService.editCanton(this.cantonForm.value, id).subscribe({
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


  loadCantonForId(id: any) {
    this.cantonService.getCantonById(id).subscribe(item => {
      this.editData = item;
      this.cantonForm.patchValue({
        canton: this.editData.canton,
        numHabitantes: this.editData.numHabitantes,
      });
    })
  }


}
