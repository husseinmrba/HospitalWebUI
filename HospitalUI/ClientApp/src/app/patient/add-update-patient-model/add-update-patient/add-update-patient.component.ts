import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPatientCommands } from '../../../interfaces/patients/ipatient-commands';
import { PatientForCreate } from './patientForCreate';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientCommandsService } from '../../services/patient-commands/patient-commands.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IPatientQueries } from 'src/app/interfaces/patients/ipatient-queries';
import { PatientQueriesService } from '../../services/patient-queries/patient-queries.service';
import { PatientsDataService } from '../../services/patients-data/patients-data.service';
import { IPatient } from 'src/app/interfaces/patients/ipatient';
import { JsonPatchService } from 'src/app/services/json-patch/json-patch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-update-patient.component.html',
  styleUrls: ['./add-update-patient.component.css']
})
export class AddUpdatePatientComponent implements OnInit, OnDestroy  {

  subToAddOrUpdatePatient!: Subscription;
  subToGetPatient!: Subscription;

  addPatientForm!: FormGroup;
  
  isAddOperation: boolean = true;
  OperationType: string = 'Add';
  patientId: string = '';
  patientInfo!: IPatient;

  private _patientCommands! : IPatientCommands;
  private _patientQueries! : IPatientQueries;

  constructor(@Inject(PatientCommandsService) patientCommands: IPatientCommands,
              @Inject(PatientQueriesService) patientQueries: IPatientQueries,
              private BsModalRef:BsModalRef,
              private modalService:BsModalService,
              private router: Router,
              private route: ActivatedRoute,
              private patientsDataService:PatientsDataService,
              private jsonPatchService: JsonPatchService,
              private location: Location) { 

    this._patientCommands = patientCommands;
    this._patientQueries = patientQueries;
}

  ngOnDestroy(): void {
    if (!!this.subToAddOrUpdatePatient)
      this.subToAddOrUpdatePatient.unsubscribe();

    if (!!this.subToGetPatient)
      this.subToGetPatient.unsubscribe();
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

    // If the process is an update, we will fetch the patient data to be assigned to a form value 
    const currentUrl = this.router.url;
    const operationStart = currentUrl.indexOf('(operation:');
    const operationType = currentUrl.substring(operationStart);

    if(operationType.includes('update')){

      this.OperationType ='Update'
      this.isAddOperation = false; 
      const startIndexOfPatientId = operationType.indexOf('/');
      const endIndexOfPatientId = operationType.indexOf(')');
      this.patientId = operationType.substring(startIndexOfPatientId + 1, endIndexOfPatientId);

      if (!!this.subToGetPatient)
          this.subToGetPatient.unsubscribe();

      this.subToGetPatient = this._patientQueries.getPatientById(this.patientId).subscribe( result => {
        this.patientInfo = {
          ...result,
          birthdate: new Date(result.birthdate),
          firstVisitDate: new Date(result.firstVisitDate)
        }

        this.addPatientForm.patchValue(this.patientInfo);
      },
      error => console.log(error));
    }
      
  }

  sendFormDate(){
    let patientInfoForm = this.addPatientForm.value as PatientForCreate;

    if (!!this.subToAddOrUpdatePatient)
          this.subToAddOrUpdatePatient.unsubscribe();

    if (this.isAddOperation) { // operation is add

      this.subToAddOrUpdatePatient = this._patientCommands.addPatient(patientInfoForm).subscribe(id => {

      console.log('patient created',id);
      let patientInfo = {
        ...patientInfoForm,
        id: id,
        recordCreationDate: Date.now()
      };

      this.patientsDataService.addPatientToTableData(patientInfo);
      this.addPatientForm.reset();
    },
    error => console.log(error));
    }

    else{ // operation is update
        let patchPatient = this.jsonPatchService.applyPatch(this.patientInfo, patientInfoForm);

        this.subToAddOrUpdatePatient = this._patientCommands.patchPatient(patchPatient[0]).subscribe(() => {

              let patientInfoUpdated  = {
                ...patientInfoForm,
                id: this.patientInfo.id,
              };
          
              this.patientsDataService.updatePatientInTableData(patientInfoUpdated);
              console.log("updated done");
        })
    }
    this.addPatientCancelled();
 }

  addPatientCancelled(){
    this.BsModalRef?.hide();
    this.location.back();
  }
}
