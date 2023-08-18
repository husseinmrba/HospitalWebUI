import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IPatientCommands } from 'src/app/interfaces/patients/ipatient-commands';
import { PatientCommandsService } from '../../services/patient-commands/patient-commands.service';
import { PatientsDataService } from '../../services/patients-data/patients-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit, OnDestroy {

  @Input() patientId: any;
  subDeletePatient!: Subscription; 

  private _patientCommands! : IPatientCommands;
  
  constructor(@Inject(PatientCommandsService) patientCommands: IPatientCommands,
              private bsModalRef:BsModalRef,
              private router: Router,
              private patientsDataService: PatientsDataService) {

      this._patientCommands = patientCommands;
  }

  ngOnDestroy(): void {

    if (!!this.subDeletePatient)
      this.subDeletePatient.unsubscribe();
  }

  ngOnInit(): void {

  }
  deletePatientCanceled(){
    this.bsModalRef.hide();
    this.router.navigate(['/patients']);
  }
  deletePatientConfirmed(){
    if (!!this.subDeletePatient)
        this.subDeletePatient.unsubscribe();

    this.subDeletePatient = this._patientCommands.deletePatient(this.patientId).subscribe(()=> {
      this.patientsDataService.deletePatientInTableData(this.patientId);
    },
    error => console.log(error));

    this.deletePatientCanceled();
  }
}
