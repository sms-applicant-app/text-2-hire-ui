import { ApplicantStatus } from './../../../shared/models/applicant-status';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
import { json } from 'express';
@Component({
  selector: 'app-applicant-by-store',
  templateUrl: './applicant-by-store.component.html',
  styleUrls: ['./applicant-by-store.component.scss'],

})
export class ApplicantByStoreComponent implements OnInit, OnChanges {
  @Input() applicantsByStore: any;
  @Input() isHired: boolean;
  @Input() jobs: any;
  applicants: any = [];
  actionsFrom: FormGroup;
  applicantData: any;
  applicantRetrieved: boolean;
  control: FormArray;
  selectedStore: any;
  viewData = [];
  hiringMangerData: any;
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
    public franchiseService: FranchiseService,

  ) { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    if (this.isHired) {
      this.applicantData = this.applicantsByStore.filter(a => a.status === ApplicantStatus.pendingOnboarding);
      this.applicantData.forEach(data => {
        if (data.startDate) {
          data.startDate = data.startDate.toDate();
        }
      });
    } else {
      this.getData();
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

  async getData(){
    let groupNumber = 1;
    let jobTitle = '';
    const sortData = this.applicantsByStore.sort((a,b) => a.jobId.localeCompare(b.jobId));
    this.applicantData = Object.assign([], sortData);
    await this.applicantData.forEach((app, index) => {
      if(index !== 0){
        if (app.jobId === sortData[index- 1].jobId) {
          groupNumber++;
        } else {
          groupNumber = 1;
        }
      }
      this.jobs.forEach(job => {
        if (job.id === app.jobId) {
          jobTitle = job.position.jobTitle;
          this.applicantData[index] = {
            groupNumber,
            jobTitle,
            ...app
          };
        }
      });
    });
  }

}
