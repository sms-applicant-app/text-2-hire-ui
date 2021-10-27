import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Applicant} from '../../../shared/models/applicant';
import {ApplicantService} from '../../../shared/services/applicant.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApplicantStatus} from '../../../shared/models/applicant-status';
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SmsService} from "../../../shared/services/sms.service";
import {ModalController} from "@ionic/angular";
import {AddNewHireComponent} from "../../../store/add-new-hire/add-new-hire.component";
import {ApplicantDetailsComponent} from "../applicant-details/applicant-details.component";



@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss'],

})
export class ApplicantListComponent implements OnInit {
  @Input() positionId: string;
  @Output() messageEvent = new EventEmitter<any>();
  applicantStatus: ApplicantStatus;
  applicants: any = [];
  dataSource: MatTableDataSource<Applicant>;
  actionsFrom: FormGroup;
  applicantData: any;
  isSubmitted: boolean;
  touchedRows: any;
  applicantId: string;
  control: FormArray;
  displayColumns = ['applicantName', 'position','status', 'phoneNumber', 'actions'];
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public firestore: AngularFirestore,
              public dbHelper: FirestoreHelperService,
              public smsService: SmsService,
              public modalController: ModalController
  ) { }

  ngOnInit() {
    this.touchedRows = []
    this.actionsFrom = this.fb.group({
      tableRows: this.fb.array([])
    })
    this.addRow()
    console.log('incoming positionId', this.positionId);
    this.getApplicantsByJobId(this.positionId);
    this.isSubmitted = false
  /*  this.actionsFrom = this.fb.group({
      actions: [''],
      applicantId: ['']
    });*/
  }
  ngAfterOnInit(){
    this.control = this.actionsFrom.get('tableRows') as FormArray;
  }
  initiateForm(): FormGroup {
    return this.fb.group({
      actions: [''],
      applicantId: [''],
      isEditable: [true]
    });
  }
  addRow() {
    const control =  this.actionsFrom.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }
  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }
  get getFormControls() {
    const control = this.actionsFrom.get('tableRows') as FormArray;
    return control;
  }
  submitForm() {
    const control = this.actionsFrom.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);

    let formValues = this.touchedRows
    const id = formValues[0].applicantId
    const action = formValues[0].actions
    this.applicantId = id;
    console.log(id, action);
    this.dbHelper.doc$(`applicant/${id}`).subscribe(data =>{
      this.applicantData = data

    });
    if(action === 'scheduleInterview'){
      const applicant = this.applicantData.name;
      const phoneNumber = this.applicantData.phoneNumber;
      const positionId = this.positionId;
      const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
      this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe(resp =>{
        console.log('sent request to lambda', resp);
      });
    }
    if(action === "hireApplicant"){
      // route hiring manger to new hire page
      const email = this.applicantId
      console.log('applcant data', this.applicantData)
      this.addNewHire(email).then(data =>{
        console.log('display new hire modal')
      })
    }
    if(action === 'interviewCompleted'){
      // route to a notes/ applicant details
      const email = this.applicantId
      console.log('applicant data', this.applicantData)
      this.applicantDetails(email).then(data =>{
        console.log('applicant details')
      })
    }
   // this.submitActionsToApplicants(this.touchedRows)
  }
  // get applicants by job
  getApplicantsByJobId(positionId){
      this.firestore.collection('applicant', ref => ref.where('positionId', '==', `${positionId}`)).get()
        .subscribe( applicant =>{
          this.applicants = [];
          if (applicant.docs.length === 0){
            console.log('no applicants for that position');
          } else {
            applicant.forEach( a =>{
              const app = a.data();
              const id = a.id;
              this.applicants.push({id, applicant: app });
              this.dataSource = new MatTableDataSource<Applicant>(this.applicants);
            });
            console.log(this.applicants);
          }
        });

  }
  submitActionsToApplicants(formValues){
    console.log('status update', formValues);
    const id = formValues[0].applicantId
    const action = formValues[0].actions
   // const id = this.actionsFrom.controls.applicantId.value;
    this.isSubmitted = true
      this.dbHelper.doc$(`applicant/${id}`).subscribe((data: any) =>{
        this.applicantData = data;
        const applicant = this.applicantData.name;
        const phoneNumber = this.applicantData.phoneNumber;
        const positionId = this.positionId;
        if(action === 'scheduleInterview'){
          const calendarLink = JSON.parse(localStorage.getItem('appUserData')).calendarLink;
          this.smsService.requestInterview(applicant, positionId, phoneNumber, calendarLink).subscribe(resp =>{
            console.log('sent request to lambda', resp);
          });
        }
        if(action === "hireApplicant"){
          // route hiring manger to new hire page
          this.addNewHire(this.applicantData).then(data =>{
            console.log('display new hire modal')
          })
        }
        if(action === 'interviewCompleted'){
          // route to a notes/ applicant details
          this.applicantDetails(this.applicantData).then(data =>{
            console.log('applicant details')
          })
        }

      });

    this.applicantService.updateApplicant(id, {status: action} );
  }
  async applicantDetails(applicant){
    const applicantDetails = await this.modalController.create({
      component: ApplicantDetailsComponent,
      swipeToClose: true,
      componentProps: {
        applicant
      }
    })
    return await applicantDetails.present()
  }
  async addNewHire(applicant){
    // add onboarding packages
    console.log('applicant', applicant)
    const addNewHireModal = await this.modalController.create({
      component: AddNewHireComponent,
      swipeToClose: true,
      componentProps: {
        applicant
      }
    })
    return await addNewHireModal.present()
  }
  moveApplicantToNextStatus(id){
    console.log('applicant to update status', id);
    this.dbHelper.doc$(`applicant/${id}`).subscribe(data =>{
      console.log('applicant data', data);
    });
  }
  sendMessageGoBackToJobsList(){
    this.messageEvent.emit(false);
  }
  declineApplicant(id){
    const status = 'applicantDeclined';

    this.applicantService.updateApplicant(id, status);
  }
}
