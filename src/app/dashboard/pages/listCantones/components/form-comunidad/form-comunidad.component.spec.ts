import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComunidadComponent } from './form-comunidad.component';

describe('FormComunidadComponent', () => {
  let component: FormComunidadComponent;
  let fixture: ComponentFixture<FormComunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComunidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
