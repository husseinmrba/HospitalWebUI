import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AddPatientComponent } from './add-update-patient-model/add-patient/add-patient.component';
import { AddUpdatePatientModelComponent } from './add-update-patient-model/add-update-patient-model.component';
import { DeletePatientComponent } from './delete-patient-model/delete-patient/delete-patient.component';
import { DeletePatientModelComponent } from './delete-patient-model/delete-patient-model.component';
import { SearchComponent } from '../shared/search/search.component';



@NgModule({
  declarations: [
    PatientsListComponent,
    AddPatientComponent,
    AddUpdatePatientModelComponent,
    DeletePatientComponent,
    DeletePatientModelComponent,
    SearchComponent

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
