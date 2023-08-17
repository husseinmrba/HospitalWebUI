import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
  ],
  exports: [
    // BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule,
    // PaginationModule,
    // BsDatepickerModule,
    BrowserAnimationsModule,
    CommonModule
    // ModalModule,
  ]
})
export class SharedModule { }
