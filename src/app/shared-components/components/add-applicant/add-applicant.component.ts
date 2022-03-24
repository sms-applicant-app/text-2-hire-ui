import { Subject, Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import { ModalController } from '@ionic/angular';
import {FranchiseService} from "../../../shared/services/franchise.service";
import {MatDialog} from "@angular/material/dialog";
import { emailValidator } from '../../../shared/utils/app-validators';
import { phoneValidator } from '../../../shared/utils/app-validators';
import { Applicant } from '../../../shared/models/applicant';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { ApplicantStatus } from '../../../shared/models/applicant-status';
import { AlertService } from '../../../shared/services/alert.service';
import { toastMess } from '../../../shared/constants/messages';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss'],
})
export class AddApplicantComponent implements OnInit, OnDestroy {
  @Input() job: any;
  addApplicantForm: FormGroup;
  newApplicant = new Applicant();
  getApplicantSub = new Subscription();
  applicantsByStoreSub: Subject<any>;
  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public franchiseService: FranchiseService,
    public dialog: MatDialog,
    public firestore: AngularFirestore,
    public applicantService: ApplicantService,
    public modalController: ModalController,
    public alertService: AlertService,
  ) { }

  ngOnInit() {
    this.initForm();
    console.log('job', this.job);
  }
  ngOnDestroy(): void {
    this.getApplicantSub.unsubscribe();
  }
  initForm() {
    this.addApplicantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, emailValidator]],
      phone: ['', [Validators.required, phoneValidator]]
    });
  }

  addApplicant() {
    if (this.addApplicantForm.valid) {
      const formValue = this.addApplicantForm.value;
      this.newApplicant.name = formValue.name;
      this.newApplicant.phoneNumber = formValue.phone;
      this.newApplicant.email = formValue.email;
      this.newApplicant.storeId = this.job.position.storeId;
      this.newApplicant.jobId = this.job.id;
      this.newApplicant.positionId = this.job.id;
      this.newApplicant.franchiseId = this.job.position.franchiseId;
      this.newApplicant.status = ApplicantStatus.applicantApplied;
      this.newApplicant.applicantId = this.firestore.createId();
      this.dbHelper.set(`applicant/${formValue.email}`, this.newApplicant).then(res =>{
        this.alertService.showSuccess(`Create success new applicant ${formValue.email}`);
        this.closeModal();
        const data = {
          id: this.newApplicant.email,
          ...this.newApplicant
        };
        this.applicantsByStoreSub.next({
          ...data
        });
      }).catch(err => {
        this.alertService.showError(err);
      });
      // this.getApplicantSub = this.applicantService.getApplicantById(formValue.email).subscribe(res => {
      //   if (res) {
      //     this.alertService.showError('Email has been used');
      //     return;
      //   }
      //   this.dbHelper.set(`applicant/${formValue.email}`, this.newApplicant).then(data =>{
      //     this.alertService.showSuccess(`Create success new applicant ${formValue.email}`);
      //     this.closeModal();
      //   }).catch(err => {
      //     this.alertService.showError(err);
      //   });
      // });
    } else {
      this.alertService.showError(toastMess.INVALID_FORM);
    }
  }

  closeModal() {
    this.modalController.dismiss().then();
  }
}
