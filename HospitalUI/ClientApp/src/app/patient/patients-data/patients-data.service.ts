import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {

  private patientsData: BehaviorSubject<any> = new BehaviorSubject([]);


  setTableData(data: any) {
      this.patientsData.next(data);
  }
  addDataToTable(data: any) {
    const currentData = this.patientsData.getValue(); 
    const updatedItems = [...currentData.items, data];

    const updatedData = {
      ...currentData,
      items: updatedItems
    };

    this.patientsData.next(updatedData);
}

  getTableData(): Observable<any> {
    return this.patientsData.asObservable();
  }
}
