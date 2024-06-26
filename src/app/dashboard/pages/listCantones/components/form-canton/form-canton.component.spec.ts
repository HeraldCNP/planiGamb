import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCantonComponent } from './form-canton.component';

describe('FormCantonComponent', () => {
  let component: FormCantonComponent;
  let fixture: ComponentFixture<FormCantonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCantonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCantonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
