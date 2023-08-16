import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PatientQueriesService } from '../services/patients/patient-queries/patient-queries.service';
import { IPatientQueries } from 'src/app/interfaces/patients/ipatient-queries';
import { IPaginatedListOfPatient } from '../interfaces/ipaginated-list-of-patient';
import { Subscription } from 'rxjs';
import { IPatientCommands } from '../interfaces/patients/ipatient-commands';
import { PatientCommandsService } from '../services/patients/patient-commands/patient-commands.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit, OnDestroy {


  addPatientModalRef?: BsModalRef;



  subAddPatient!: Subscription; 
  subDeletePatient!: Subscription; 

  patientsWithPagination = { } as IPaginatedListOfPatient;
  pageSize: number = 10;
  pageSizeToPagination: number = 10;
  private _keyWord: string = ''
  searchBy: string = "";

  smallnumPages = 0;

  private _patientQueries! : IPatientQueries;
  private _patientCommands! : IPatientCommands;

  constructor(@Inject(PatientQueriesService) patientQueries: IPatientQueries,
              @Inject(PatientCommandsService) patientCommands: IPatientCommands,
              private modalService: BsModalService) { 
    this._patientQueries = patientQueries;
    this._patientCommands = patientCommands;
  }

  public get keyWord() : string {
    return this._keyWord;
  }
  public set keyWord(v : string){
    this._keyWord = v;
  }

    openModalWithClass(template: TemplateRef<any>) {
    this.addPatientModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit(): void {
    this.getPatients();
  }
  ngOnDestroy() {
    if (!!this.subAddPatient)
      this.subAddPatient.unsubscribe();

    if (!!this.subDeletePatient)
      this.subDeletePatient.unsubscribe();
  }

  getPatients(){
    if (!!this.subAddPatient)
      this.subAddPatient.unsubscribe();
    
    this.subAddPatient = this._patientQueries
            .getPatientsWithPagination(
                  this.patientsWithPagination.pageNumber,
                  this.pageSizeToPagination,
                  this.searchBy,
                  this.keyWord).subscribe((result) => {             
      this.patientsWithPagination = result;
    },
    error => console.log(error));
  }

  saveSelectedValue(event: any){
    const selectedValue = event.target.value;
    this.searchBy = selectedValue;
  }
  onSearch(){
    this.pageSizeToPagination = this.pageSize;
    this.patientsWithPagination.pageNumber = 1;
    this.getPatients();
  }

  deletePatient(patientId: string, patientName: string){
    if (!!this.subDeletePatient)
      this.subDeletePatient.unsubscribe();

    var deleteConfirmed = confirm(`Are you sure to delete the patient ${patientName}?`)
    if(deleteConfirmed)
        this.subDeletePatient = this._patientCommands.deletePatient(patientId).subscribe(()=> {
            this.patientsWithPagination.items = this.patientsWithPagination.items.filter(i => i.id !== patientId);
        },
        error => console.log(error));
  }

  onChangePageSize(event: any){
    this.pageSize = event.target.value;
  }

}
