import { Observable } from "rxjs";
import { PatientForCreate } from "src/app/add-patient/patientForCreate";

export interface IPatientCommands{
    addPatient(command: PatientForCreate): Observable<string>

    deletePatient(patientId: string): Observable<void>
}