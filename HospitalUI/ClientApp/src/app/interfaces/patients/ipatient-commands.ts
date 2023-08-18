import { Observable } from "rxjs";
import { PatientForCreate } from "src/app/patient/add-update-patient-model/add-patient/patientForCreate";

export interface IPatientCommands{
    addPatient(command: PatientForCreate): Observable<string>

    deletePatient(patientId: string): Observable<void>

    patchPatient(data: any): Observable<void>
}