import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePatientModelComponent } from './add-update-patient-model.component';

describe('AddUpdatePatientModelComponent', () => {
  let component: AddUpdatePatientModelComponent;
  let fixture: ComponentFixture<AddUpdatePatientModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdatePatientModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdatePatientModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
