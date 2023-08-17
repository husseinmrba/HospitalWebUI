import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddUpdatePatientModelComponent } from './add-update-patient-model/add-update-patient-model.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    PatientsListComponent,
    AddPatientComponent,
    AddUpdatePatientModelComponent,

  ],
  imports: [
    HttpClientModule,

    RouterModule.forChild([
      { path: '', component: PatientsListComponent},
      { path: 'add', component: AddUpdatePatientModelComponent, outlet:'operation'},
    ]),
    
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // SharedModule,
  ],
  entryComponents: [
    AddUpdatePatientModelComponent
  ],
})
export class PatientModule { }
