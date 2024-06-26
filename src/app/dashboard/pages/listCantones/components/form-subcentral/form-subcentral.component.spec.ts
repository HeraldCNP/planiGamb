import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubcentralComponent } from './form-subcentral.component';

describe('FormSubcentralComponent', () => {
  let component: FormSubcentralComponent;
  let fixture: ComponentFixture<FormSubcentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubcentralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSubcentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
