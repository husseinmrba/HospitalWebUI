import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
    
  }
  openModalWithComponent() {
    
  }
}



  
