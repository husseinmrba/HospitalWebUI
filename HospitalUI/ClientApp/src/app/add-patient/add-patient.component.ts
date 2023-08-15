import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPatientCommands } from '../interfaces/patients/ipatient-commands';
import { PatientCommandsService } from '../services/patients/patient-commands/patient-commands.service';
import { PatientForCreate } from './patientForCreate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit, OnDestroy {

  sub!: Subscription;

  addPatientForm!: FormGroup;
  
  private _patientCommands! : IPatientCommands;

  constructor(@Inject(PatientCommandsService) patientCommands: IPatientCommands) { 
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
    },
    error => console.log(error));
  }
}
