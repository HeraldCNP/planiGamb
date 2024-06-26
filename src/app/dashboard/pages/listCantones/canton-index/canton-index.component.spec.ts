import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantonIndexComponent } from './canton-index.component';

describe('CantonIndexComponent', () => {
  let component: CantonIndexComponent;
  let fixture: ComponentFixture<CantonIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantonIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
