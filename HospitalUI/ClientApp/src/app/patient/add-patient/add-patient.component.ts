import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPatientCommands } from '../../interfaces/patients/ipatient-commands';
import { PatientForCreate } from './patientForCreate';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientCommandsService } from '../services/patient-commands/patient-commands.service';
import { Router } from '@angular/router';
import { PatientsListComponent } from '../patients-list/patients-list.component';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit, OnDestroy  {
  sub!: Subscription;

  addPatientForm!: FormGroup;
  
  private _patientCommands! : IPatientCommands;

  constructor(@Inject(PatientCommandsService) patientCommands: IPatientCommands,
              private BsModalRef:BsModalRef,
              private modalService:BsModalService,
              private router: Router,
              ) { 

    this._patientCommands = patientCommands;

  }

  ngOnDestroy(): void {
    if (!!this.sub)
      this.sub.unsubscribe();
  }


  
  ngOnInit(): void {

    this.addPatientForm = new FormGroup({
      name: new FormControl(),
      fileNo: new FormControl(),
      citizenId: new FormControl(),
      birthdate: new FormControl(),
      firstVisitDate: new FormControl(),
      natinality: new FormControl(),
      phoneNumber: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      country: new FormControl(),
      city: new FormControl(),
      street: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      contactPerson: new FormControl(),
      contactRelation: new FormControl(),
      contactPhone: new FormControl(),
    });
    
  }
  sendFormDate(){
    if (!!this.sub)
      this.sub.unsubscribe();

    let newPatient = this.addPatientForm.value as PatientForCreate;
    console.log(newPatient);
    this.sub = this._patientCommands.addPatient(newPatient).subscribe(id => {
      console.log('patient created',id);
      this.addPatientForm.reset();
      this.addPatientCancelled();
    },
    error => console.log(error));
  }

  addPatientCancelled(){
    this.BsModalRef?.hide();
    this.router.navigate(['/patients']);
  }
}
