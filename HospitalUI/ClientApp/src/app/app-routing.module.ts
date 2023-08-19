import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';




export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.module').then(
        m => m.PatientModule)
  },
  
  // General 2 Path
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
