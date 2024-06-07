import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetalleComponent } from './project-detalle.component';

describe('ProjectDetalleComponent', () => {
  let component: ProjectDetalleComponent;
  let fixture: ComponentFixture<ProjectDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
