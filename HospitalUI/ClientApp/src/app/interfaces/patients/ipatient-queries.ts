import { Observable } from 'rxjs';
import { IPaginatedListOfPatient } from '../ipaginated-list-of-patient'
import { IPatient } from './ipatient';

export interface IPatientQueries{
    getPatientsWithPagination(pageNumber: number | undefined,
                               pageSize: number | undefined,
                               searchBy: string | undefined,
                               keyWord: string | undefined): Observable<IPaginatedListOfPatient>;

    getPatientById(id: string): Observable<IPatient>;
                               
}






