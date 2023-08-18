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
import { DeletePatientComponent } from './delete-patient/delete-patient.component';
import { DeletePatientModelComponent } from './delete-patient-model/delete-patient-model.component';



@NgModule({
  declarations: [
    PatientsListComponent,
    AddPatientComponent,
    AddUpdatePatientModelComponent,
    DeletePatientComponent,
    DeletePatientModelComponent,

  ],
  imports: [
    HttpClientModule,

    RouterModule.forChild([
      { path: '', component: PatientsListComponent},
      { path: 'add', component: AddUpdatePatientModelComponent, outlet:'operation'},
      { path: 'update/:id', component: AddUpdatePatientModelComponent, outlet:'operation'},
      { path: 'delete/:id', component: DeletePatientModelComponent, outlet:'operation'},
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
    AddUpdatePatientModelComponent,
    DeletePatientModelComponent
  ],
})
export class PatientModule { }
