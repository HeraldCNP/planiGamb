import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CantonService } from '../../../../services/canton.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../material/material.module';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-form-subcentral',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './form-subcentral.component.html',
  styleUrl: './form-subcentral.component.css'
})
export class FormSubcentralComponent {

  private fb = inject(FormBuilder);
  private cantonService = inject(CantonService);
  private projectService = inject(ProjectService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormSubcentralComponent>) {

  }

  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }


  public subcentralForm: FormGroup = this.fb.group({
    canton: ['', [Validators.required]],
    subcentralia: ['', [Validators.required]],
    numHabitantes: [''],
  })

  cantones = signal<any[]>([]);

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.id != 0){
      this.loadSubcentralForId(this.inputData.id);
    }
    this.getCantones();
  }

  get form() {
    return this.subcentralForm.controls;
  }


  getCantones(): void {
    this.projectService.getCantones().subscribe({
      next: (response) => {
        this.cantones.set(response);
        console.log('cantones', this.cantones());
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  saveSubCentral() {
    this.cantonService.createSubcentral(this.subcentralForm.value).subscribe({
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

  editSubcentral(id:any){
    this.cantonService.editSubcentral(this.subcentralForm.value, id).subscribe({
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


  loadSubcentralForId(id: any) {
    this.cantonService.getSubcentralById(id).subscribe(item => {
      this.editData = item;
      console.log(this.editData);
      
      this.subcentralForm.patchValue({
        canton: this.editData.canton._id,
        subcentralia: this.editData.subcentralia,
        numHabitantes: this.editData.numHabitantes,
      });
    })
  }

}
