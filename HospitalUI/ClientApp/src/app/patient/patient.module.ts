import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AddUpdatePatientModelComponent } from './add-update-patient-model/add-update-patient-model.component';
import { DeletePatientComponent } from './delete-patient-model/delete-patient/delete-patient.component';
import { DeletePatientModelComponent } from './delete-patient-model/delete-patient-model.component';
import { AddUpdatePatientComponent } from './add-update-patient-model/add-update-patient/add-update-patient.component';



@NgModule({
  declarations: [
    PatientsListComponent,
    AddUpdatePatientComponent,
    AddUpdatePatientModelComponent,
    DeletePatientComponent,
    DeletePatientModelComponent,

  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: PatientsListComponent},
      { path: 'add', component: AddUpdatePatientModelComponent, outlet:'operation'},
      { path: 'update/:id', component: AddUpdatePatientModelComponent, outlet:'operation'},
      { path: 'delete/:id', component: DeletePatientModelComponent, outlet:'operation'},
    ]),
    SharedModule,
  ],
  entryComponents: [
    AddUpdatePatientModelComponent,
    DeletePatientModelComponent
  ],
})
export class PatientModule { }
