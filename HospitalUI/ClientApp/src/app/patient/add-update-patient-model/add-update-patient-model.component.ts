import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AddUpdatePatientComponent } from './add-update-patient/add-update-patient.component';

@Component({
  selector: 'app-add-update-patient-model',
  templateUrl: './add-update-patient-model.component.html',
  styleUrls: ['./add-update-patient-model.component.css']
})
export class AddUpdatePatientModelComponent implements OnInit, OnDestroy {

  destroy = new Subject<any>();
  currentDialog!: any;
  sub!: Subscription;
  
  constructor(private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router
    ) { }
  ngOnDestroy(): void {
    this.destroy.next(undefined);

    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if(!!this.sub)
        this.sub.unsubscribe();

    this.sub = this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

      this.currentDialog = this.modalService.show(AddUpdatePatientComponent,
                                                  Object.assign({}, { class: 'gray modal-lg' })); 
                                                  
    });
  
  
  }

}
