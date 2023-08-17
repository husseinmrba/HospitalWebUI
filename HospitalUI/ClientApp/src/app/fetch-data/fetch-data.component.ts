import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../home/home.component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];
  bsModalRef?: BsModalRef;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,
  private modalService: BsModalService) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    // this.bsModalRef = this.modalService.show(ModalContentComponent);
  }
  

}


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
