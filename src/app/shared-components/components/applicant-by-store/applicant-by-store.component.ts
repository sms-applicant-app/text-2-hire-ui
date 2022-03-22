import { filter } from 'rxjs/operators';
import { ApplicantStatus } from './../../../shared/models/applicant-status';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Applicant} from '../../../shared/models/applicant';
import {ApplicantService} from '../../../shared/services/applicant.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SmsService} from '../../../shared/services/sms.service';
import {ModalController} from '@ionic/angular';
import {ApplicantDetailsComponent} from '../applicant-details/applicant-details.component';
import {AlertService} from '../../../shared/services/alert.service';
import { JobService } from './../../../shared/services/job.service';
import { UserService } from './../../../shared/services/user.service';
import { FranchiseService } from './../../../shared/services/franchise.service';
@Component({
  selector: 'app-applicant-by-store',
  templateUrl: './applicant-by-store.component.html',
  styleUrls: ['./applicant-by-store.component.scss'],

})
export class ApplicantByStoreComponent implements OnInit, OnChanges {
  @Input() applicantsByStore: any;
  @Input() isHired: boolean;
  applicants: any = [];
  dataSource: MatTableDataSource<Applicant>;
  actionsFrom: FormGroup;
  applicantData: any;
  applicantRetrieved: boolean;
  control: FormArray;
  selectedStore: any;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  viewData = [];
  constructor(
    public fb: FormBuilder,
    public applicantService: ApplicantService,
    public firestore: AngularFirestore,
    public dbHelper: FirestoreHelperService,
    public smsService: SmsService,
    public modalController: ModalController,
    public alertService: AlertService,
    public jobService: JobService,
    public userService: UserService,
    public franchiseService: FranchiseService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    if (this.isHired) {
      this.applicantData = this.applicantsByStore.filter(a => a.applicant.status === ApplicantStatus.pendingOnboarding);
    } else {
      this.applicantData = this.applicantsByStore;
    }
  }
  async applicantDetails(applicant){
    const applicantDetails = await this.modalController.create({
      component: ApplicantDetailsComponent,
      swipeToClose: true,
      componentProps: {
        applicant
      }
    });
    return await applicantDetails.present();
  }
  closeModal() {
    this.modalController.dismiss().then();
  }
}
