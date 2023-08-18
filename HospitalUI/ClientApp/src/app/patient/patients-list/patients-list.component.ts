import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { IPatientQueries } from 'src/app/interfaces/patients/ipatient-queries';
import { IPaginatedListOfPatient } from '../../interfaces/ipaginated-list-of-patient';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IPatientCommands } from '../../interfaces/patients/ipatient-commands';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientQueriesService } from '../services/patient-queries/patient-queries.service';
import { PatientCommandsService } from '../services/patient-commands/patient-commands.service';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsDataService } from '../services/patients-data/patients-data.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit, OnDestroy {

  destroy = new Subject<any>();
  currentDialog!: BsModalRef;

  subAddPatient!: Subscription; 

  patientsWithPagination = { } as IPaginatedListOfPatient;
  pageSize: number = 10;
  pageSizeToPagination: number = 10;
  private _keyWord: string = ''
  searchBy: string = "";

  smallnumPages = 0;

  private _patientQueries! : IPatientQueries;
  
  constructor(@Inject(PatientQueriesService) patientQueries: IPatientQueries,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router,
              private patientsDataService:PatientsDataService) { 

    this._patientQueries = patientQueries;
      }

  public get keyWord() : string {
    return this._keyWord;
  }
  public set keyWord(v : string){
    this._keyWord = v;
  }

  showAddPatientModal() {
    this.router.navigate(['/patients', { outlets: { operation: ['add'] } }]);
  }

  ngOnInit(): void {
    this.getPatients();
  }
  ngOnDestroy() {
    if (!!this.subAddPatient)
      this.subAddPatient.unsubscribe();

      this.destroy.next(undefined);
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

        this.patientsDataService.setTableData(result);
        this.patientsDataService.getTableData().subscribe(data => {
        this.patientsWithPagination = data;
        });
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

  deletePatient(patientId: string){
    this.router.navigate(['/patients', { outlets: { operation: ['delete', patientId] } }]);
  }
  updatePatient(patientId: string){
    this.router.navigate(['/patients', { outlets: { operation: ['update', patientId] } }]);
  }
  
  onChangePageSize(event: any){
    this.pageSize = event.target.value;
  }

}
