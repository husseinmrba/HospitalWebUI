import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { PatientForCreate } from 'src/app/add-patient/patientForCreate';
import { IPatientCommands } from 'src/app/interfaces/patients/ipatient-commands';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class PatientCommandsService implements IPatientCommands {
  private _http: HttpClient;
  private _baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this._http = http;
    this._baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  deletePatient(patientId: string): Observable<void> {
    let url = this._baseUrl + "/api/Patients/{id}";
    

    if (patientId === undefined || patientId === null)
        throw new Error("The parameter 'patientId' cannot be null.");
   
    url = url.replace("{id}", encodeURIComponent("" + patientId));
    url = url.replace(/[?&]$/, "");
    
    return this._http.delete<void>(url);
  }

  addPatient(command: PatientForCreate): Observable<string> {
    let url = this._baseUrl + "/api/Patients";
    url = url.replace(/[?&]$/, "");
    
    return this._http.post<string>(url,command);
  }


}



