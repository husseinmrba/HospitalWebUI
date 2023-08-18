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

  getTableData(): Observable<any> {
    return this.patientsData.asObservable();
  }

  addPatientToTableData(data: any) {
    const currentData = this.patientsData.getValue(); 
    const updatedItems = [...currentData.items, data];

    const updatedData = {
      ...currentData,
      items: updatedItems
    };

    this.patientsData.next(updatedData);
  }

  updatePatientInTableData(updatedPatient: any){

    const currentData = this.patientsData.getValue();

    const updatedItems = currentData.items.map((item: any) => {
        if (item.id === updatedPatient.id) {
          return { ...item, ...updatedPatient };
        }
        return item;
    });

    const updatedData = {
      ...currentData,
      items: updatedItems
    };

    this.patientsData.next(updatedData);
  }
  
  deletePatientInTableData(id: any){
    const currentData = this.patientsData.getValue();
    const updatedItems = currentData.items.filter((item: any) => item.id !== id);
  
    const updatedData = {
      ...currentData,
      items: updatedItems
    };
  
    this.patientsData.next(updatedData);
  }
}
