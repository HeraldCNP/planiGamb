import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreate2Component } from './project-create2.component';

describe('ProjectCreate2Component', () => {
  let component: ProjectCreate2Component;
  let fixture: ComponentFixture<ProjectCreate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreate2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCreate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
