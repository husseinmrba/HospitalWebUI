import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';

@Component({
  selector: 'app-delete-patient-model',
  templateUrl: './delete-patient-model.component.html',
  styleUrls: ['./delete-patient-model.component.css']
})
export class DeletePatientModelComponent implements OnInit,OnDestroy {

  destroy = new Subject<any>();
  currentDialog!: any;
  
  constructor(private modalService: BsModalService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {

      // When router navigates on this component is takes the params and opens up the photo detail modal
      this.currentDialog = this.modalService.show(DeletePatientComponent);
      this.currentDialog.content.patientId = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(undefined);
  }

  

}
