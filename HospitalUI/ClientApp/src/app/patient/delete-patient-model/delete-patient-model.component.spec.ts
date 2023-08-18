import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatientModelComponent } from './delete-patient-model.component';

describe('DeletePatientModelComponent', () => {
  let component: DeletePatientModelComponent;
  let fixture: ComponentFixture<DeletePatientModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePatientModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePatientModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
