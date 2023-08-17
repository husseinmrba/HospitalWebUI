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
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...',
          
        ],
        title: 'Modal with component'
      }
    };
    this.modalService.show(ModalContentComponent);
  }
}


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  title?: string = 'Modal with component';
  closeBtnName?: string = 'Close';
  list: any[] = [];
 
  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService) {}
 
  ngOnInit() {
    
    this.list.push('PROFIT!!!');
    
  }
}