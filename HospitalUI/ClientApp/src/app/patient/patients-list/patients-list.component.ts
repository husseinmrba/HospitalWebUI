import { Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { IPatientQueries } from 'src/app/interfaces/patients/ipatient-queries';
import { IPaginatedListOfPatient } from '../../interfaces/ipaginated-list-of-patient';
import { Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientQueriesService } from '../services/patient-queries/patient-queries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsDataService } from '../services/patients-data/patients-data.service';
import { ISearch } from 'src/app/shared/search/isearch';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit, OnDestroy {

  // destroy = new Subject<any>();
  currentDialog!: BsModalRef;

  subGetPatients!: Subscription; 
  subQueryParams!: Subscription; 
  subTableData!: Subscription; 

  patientsWithPagination = { } as IPaginatedListOfPatient;
  maxPageSize: number = 10;
  rotate: boolean = false;

  // pageSize: number = 10;
  private _pageNumber: number = 1;
  // keyWord: string = '';
  // searchBy: string = '';

  parameters = {
    pageNumber: 1,
    pageSize: 10,
    searchBy: '',
    keyWord: ''
  };

  smallnumPages = 1;
  private _patientQueries! : IPatientQueries;
  
  constructor(@Inject(PatientQueriesService) patientQueries: IPatientQueries,
              private route: ActivatedRoute,
              private router: Router,
              private patientsDataService:PatientsDataService) { 

    this._patientQueries = patientQueries;
    this.getQueryParams();

  }

  public get pageNumber() : number {
    return this._pageNumber;
  }
  public set pageNumber(v : number){
    this._pageNumber = v;
    this.parameters.pageNumber = v;
  }



  showAddPatientModal() {
    this.router.navigate(['/patients', { outlets: { operation: ['add'] } }],{ queryParams: this.parameters });
  }

  ngOnInit(): void {
    
    this.getPatients();
  }
  getQueryParams(){
    
    this.subQueryParams = this.route.queryParams.subscribe(params => {
      
      this.pageNumber = params.pageNumber? params.pageNumber : 1;
      this.parameters.pageSize = params.pageSize? params.pageSize : 10;
      if(this.parameters.pageSize > 15)  
          this.parameters.pageSize = 15;

      this.parameters.searchBy = params.searchBy;
      this.parameters.keyWord = params.keyWord;
      
      
    }); 
  }
  ngOnDestroy() {
    if (!!this.subGetPatients)
      this.subGetPatients.unsubscribe();

    this.subQueryParams.unsubscribe();
    this.subTableData.unsubscribe();
    // this.destroy.next(undefined);
  }

  getPatients(){
    if (!!this.subGetPatients)
      this.subGetPatients.unsubscribe();
    
    this.subGetPatients = this._patientQueries
            .getPatientsWithPagination(
                  this._pageNumber,
                  this.parameters.pageSize,
                  this.parameters.searchBy,
                  this.parameters.keyWord).subscribe((result) => {     

        this.patientsDataService.setTableData(result);
        this.subTableData = this.patientsDataService.getTableData().subscribe(data => {

            this.patientsWithPagination = data;

            this.router.navigate([], {
              queryParams: this.parameters,
              queryParamsHandling: 'merge', // لدمج الباراميترات مع الباراميترات الحالية
              relativeTo: this.route // قد تحتاج إلى تحديد المسار النسبي إذا كنت تستخدم routing في Angular
            });
        });
      },
      error => console.log(error)); 
      
    
  }


  onSearch(search: ISearch){
    this.parameters.searchBy = search.searchBy;
    this.parameters.keyWord = search.keyWord;
    this.pageNumber = 1;

    this.getPatients();
  }

  deletePatient(patientId: string){
    this.router.navigate(['/patients', { outlets: { operation: ['delete', patientId] } }], { queryParams: this.parameters });
  }

  updatePatient(patientId: string){
    this.router.navigate(['/patients', { outlets: { operation: ['update', patientId] } }], { queryParams: this.parameters });
  }
  
  onChangePageSize(event: any){
    this.parameters.pageSize = event.target.value;
    if (this.parameters.pageSize > 15) {
      this.parameters.pageSize = 15;
    }

    this.getPatients();
  }

}
