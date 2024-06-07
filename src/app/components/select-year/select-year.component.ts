import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-select-year',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './select-year.component.html',
  styleUrl: './select-year.component.css'
})
export class SelectYearComponent implements OnInit {

  @Input() control!: FormControl ;
  @Input() clases!: string ;
  years: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateYears(10); // Generar los últimos 5 años, puedes cambiar este valor según sea necesario
  }

  generateYears(n: number): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: n }, (v, i) => currentYear - i);
  }

}
