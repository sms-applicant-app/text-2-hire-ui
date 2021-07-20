import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {Applicant} from "../../shared/models/applicant";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApplicantService} from "../../shared/services/applicant.service";
import {AuthService} from "../../shared/services/auth.service";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import {ModalModule} from "../../shared-components/pop-over-window/model/modal/modal.module";
import {ModalController} from "@ionic/angular";
import {RegisterApplicantComponent} from "../../shared-components/components/register-applicant/register-applicant.component";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-store-interview',
  templateUrl: './store-interview.page.html',
  styleUrls: ['./store-interview.page.scss'],
})
export class StoreInterviewPage implements OnInit {
  @Input() franchiseId: string;
  @Input() storeId: string;
  applicantAdded: boolean;
  applicantCaptureForm: FormGroup;
  newApplicant: Applicant = new Applicant();
  applicantData: any = [];
  formUrl = 'https://form.typeform.com/to/JEHf3wpl';
  interval;
  isApplicantRegistered: boolean;
  userData: any;
  displayColumns= ['fullName', 'phoneNumber', 'actions'];
  constructor(public fb: FormBuilder,
              public applicantService: ApplicantService,
              public authService: AuthService,
              public firestoreHelper: FirestoreHelperService,
              public modalController: ModalController,
              public userService: UserService
              ) { }

  ngOnInit() {
    this.isApplicantRegistered = false;
    console.log('incoming storeId', this.storeId);
    console.log('incoming franchiseId', this.franchiseId);
    // todo capture initial applicant information by registering in the system if not already a user, like name, contact information, possibly job applying for list open requisitions for hiring managers stores
    /**
     * Is applicant registered? Yes .. route to login. No? route to Register User Component
     *
     */

    // typeform sdk no worky for now
    // add back to constructor to use sdk = private renderer: Renderer2, private el: ElementRef
   /* this.interval = setInterval(() => {
      const widget = this.renderer.createElement('typeform-widget');
      widget.setAttribute('url', this.formUrl);
      this.renderer.appendChild(this.el.nativeElement, widget);
    }, 5000);*/
  }
  async applicantIsNotRegistered(){
    const storeId = this.storeId;
    // show registration modal In pouting user type / role, use phone number as initial password
    const registerApplicant = await this.modalController.create({
      component: RegisterApplicantComponent,
      swipeToClose: true,
      componentProps: {
        storeId
      }
    });
    return await registerApplicant.present();
  }
  applicantAlreadyRegistered(){
    this.applicantData = this.applicantService.getApplicantsByStore(this.storeId);
    console.log('list of applicants', this.applicantData);
    // show list of applicants registered and scheduled for interview for that particular store
  }

}
