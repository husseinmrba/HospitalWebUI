import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatedListOfPatient } from 'src/app/interfaces/ipaginated-list-of-patient';
import { IPatient } from 'src/app/interfaces/patients/ipatient';
import { IPatientQueries } from 'src/app/interfaces/patients/ipatient-queries';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class PatientQueriesService implements IPatientQueries {

  private _http: HttpClient;
  private _baseUrl: string;
  
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this._http = http;
    this._baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  getPatientById(id: string): Observable<IPatient> {
    let url_ = this._baseUrl + "/api/Patients/";

    if (id === null)
          throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
          url_ += encodeURIComponent(id);

    url_ = url_.replace(/[?&]$/, "");

    return this._http.get<IPatient>(url_);
  }

  
  getPatientsWithPagination(pageNumber: number | undefined, pageSize: number | undefined, searchBy: string | undefined, keyWord: string | undefined): Observable<IPaginatedListOfPatient> {
    let url_ = this._baseUrl + "/api/Patients?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";

        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";

        if (searchBy !== undefined && searchBy !== '')
            url_ += "SearchBy=" + encodeURIComponent("" + searchBy) + "&";

        if (keyWord !== undefined && keyWord !== '')
            url_ += "KeyWord=" + encodeURIComponent("" + keyWord) + "&";

        url_ = url_.replace(/[?&]$/, "");

        return this._http.get<IPaginatedListOfPatient>(url_);
  }
}
