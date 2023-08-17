import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';



@NgModule({
  declarations: [
    PatientsListComponent,
    AddPatientComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: PatientsListComponent},
      { path: 'add', component: AddPatientComponent },
    ]),
    // BrowserAnimationsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
  ]
})
export class PatientModule { }
