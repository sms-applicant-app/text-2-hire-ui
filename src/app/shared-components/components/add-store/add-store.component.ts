import { Role } from './../../../shared/models/role';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Store} from '../../../shared/models/store';
import { v4 as uuidv4 } from 'uuid';
import {ModalController, NavController} from '@ionic/angular';
import {MatStepper} from '@angular/material/stepper';
import {StoreService} from '../../../shared/services/store.service';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {UserService} from '../../../shared/services/user.service';
import {GeneratedStoreId} from '../../../shared/models/generatedStoreId';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../shared/models/user';
import {JobService} from '../../../shared/services/job.service';
import { AlertService } from '../../../shared/services/alert.service';
import { toastMess } from '../../../shared/constants/messages';
import { phoneValidator } from '../../../shared/utils/app-validators';
import { AuthService } from '../../../shared/services/auth.service';
import {DomSanitizer} from "@angular/platform-browser";
import {StoreHiringManager} from "../../../shared/models/store-manager";



@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
  providers: [ DatePipe, MatStepper ]
})
export class AddStoreComponent implements OnInit {
  @Input() storeIsAddedByAdmin: boolean;
  @Input() franchiseIdFromList: string;
  @Input() franchiseId: string;
  @Input() isAdminDashBoard: boolean;
  @Output() storeAddedEvent = new EventEmitter<boolean>();
  businessLegalName: string;
  addStoreForm: FormGroup;
  userData: any;
  addAddress: boolean;
  addressAdded: any;
  addressType: string;
  addedUserToStore: boolean;
  storeAdded: boolean;
  addressId: string;
  newStore: Store = new Store();
  newGeneratedStoreId: GeneratedStoreId = new GeneratedStoreId();
  date;
  latestDate: string;
  currentStepIndex = 0;
  storeId: string;
  addingNewUser: boolean;
  userId: string;
  storeUniqueId: any;
  initialStoreId: string;
  lastUsedStoreId: any;
  newUserHiringManagerData: any;
  existingHiringManagerId: string;
  dataSource: MatTableDataSource<User>;
  hiringManagers: any = [];
  newStoreManger: StoreHiringManager = new StoreHiringManager();
  lastGeneratedId: any;
  qrCodeId: string;
  storeCreated: boolean;
  displayColumns= ['name', 'phoneNumber', 'actions'];
  onStoreAddedSub: Subject<Store>;
  role: string;

  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public navCtrl: NavController,
    public storeService: StoreService,
    public firestore: AngularFirestore,
    public userService: UserService,
    public jobService: JobService,
    public alertService: AlertService,
    public modalController: ModalController,
    public authService: AuthService,
    public sanitizer: DomSanitizer

  ) { }

  ngOnInit() {

    this.userId = JSON.parse(localStorage.getItem('user')).email;
    //this.role = this.authService.getRole();
    this.addAddress = false;
    this.addingNewUser = false;
    this.userService.getUsersByFranchise(this.franchiseId);
    this.createStoreForm();
    this.addStoreAddress();
    this.initialStoreId = '005';
    this.getHiringManagersPerFranchise();
    this.storeAdded = false;
  }

  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }
  createStoreForm(){
    this.addStoreForm = this.fb.group({
      storePhoneNumber: ['', [Validators.required, phoneValidator]],
      storeName: ['', Validators.required]
    });
  }

  addStoreAddress(){
    this.addressId = uuidv4();
    this.addAddress = true;
    this.addressType = 'Store';
  }
  addNewUserToStore(){
    this.addingNewUser = true;
  }

  receiveAddressMessage($event){
    this.addressAdded = $event;
  }

  selectionChange(e) {
    console.log('store step', e);
    if(e.selectedIndex == 3) {
      this.getLastGeneratedStoreId();
    }
  }


  goBack(stepper: MatStepper){
    console.log('stepper index', stepper);
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    console.log('stepper index', stepper);
    stepper.next();
  }
  getLastGeneratedStoreId() {
   return this.firestore.collection('storeIds', ref => ref.orderBy('createdAt', 'desc').limit(1)).get()
      .subscribe(ss => {
        if(ss.docs.length === 0){
          this.newGeneratedStoreId.generatedStoreId = '1';
          this.newGeneratedStoreId.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
          this.storeService.addGeneratedStoreId(this.newGeneratedStoreId).then(data=>{
            console.log('added generated store Id', data);
          });
        }
        ss.docs.forEach(doc => {
          this.lastGeneratedId = doc.data();
          const lastId = this.lastGeneratedId.generatedStoreId;
          this.createStoreUniqueId(lastId);
        });
      });
  }
  createStoreUniqueId(lastId: string){
    // change state to HN for hirenow later we can make better unique ID
    let increment = 0;
    increment = 1;
    this.newStore.storeId = (+increment + parseInt(lastId, 10)).toString();
    this.newGeneratedStoreId.generatedStoreId = this.newStore.storeId;
  }

  getHiringManagersPerFranchise(){
    this.firestore.collection('users', ref => ref.where('role', '==', 'hiringManager').where('franchiseId', '==', this.franchiseId)).get()
      .subscribe(users =>{
        this.hiringManagers = [];
        if(users.docs.length === 0){
          console.log('no hiring managers for this store');
        } else {
          users.forEach(data =>{
            const u = data.data();
            this.hiringManagers.push(u);
            this.dataSource = new MatTableDataSource<User>(this.hiringManagers);
          });
        }
      });
  }

  /**
   * Add new hiring manager
   * @param $event
   */
  receiveUserMessage($event){
    this.newUserHiringManagerData = $event;
    console.log('user added', this.newUserHiringManagerData);
    this.newStore.storeHiringEmail = this.newUserHiringManagerData.email;
    this.newStore.hiringManagersName = this.newUserHiringManagerData.fullName;
    console.log('adding new manager',this.newStore);
  }
  /**
   *
   * Add new or Existing Hiring Manager to newly created store
   * @param userId
   * @param hiringManagerName
   * @param stepper
   */
  addHiringManagerToStore(userId,hiringManagerName, stepper: MatStepper){
    // update hiring manager by assigning the store to id to their user object
    // if new user create User if existing just update user
    console.log('adding hiring manager ', userId, hiringManagerName);
      const storeId = this.newStore.storeId;
      this.newStore.storeHiringEmail = userId;
      this.newStore.hiringManagersName = hiringManagerName;
     //todo: add navigation to go to next Mat Step
    this.alertService.showSuccess('Hiring manager added ', this.newStore.storeHiringEmail);
    stepper.next();
  }
  addStore(stepper: MatStepper){
    if (this.addStoreForm.valid) {
      this.createDate();
    // this.createStoreUniqueId();
      this.newStore.franchiseId = this.franchiseId;
      this.newStore.storeName = this.addStoreForm.controls.storeName.value;
      this.newStore.storePhoneNumber = this.addStoreForm.controls.storePhoneNumber.value;
      if (this.addressAdded && this.addressAdded.addressId) {
        this.newStore.addressId = this.addressAdded.addressId;
      }
      else {
        this.newStore.addressId = this.addressId;
      }
      this.newStore.storeId = this.newGeneratedStoreId.generatedStoreId;
      this.newStore.createdDate = firebase.default.firestore.FieldValue.serverTimestamp();
      this.storeService.createStore(this.newStore).then((resp: any) =>{
        this.storeId = JSON.parse(localStorage.getItem('added-storeId'));
        this.newGeneratedStoreId.storeId = this.storeId;
        this.storeAdded = true;
        this.newGeneratedStoreId.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
       /* this.qrCode = this.storeService.createQRCode(this.storeId, 1).subscribe((data: any)=>{
          console.log('qr-code', this.qrCode);
        });*/

        this.storeService.addGeneratedStoreId(this.newGeneratedStoreId).then();
        if ( this.isAdminDashBoard === false) {
          this.onStoreAddedSub.next({
            ...this.newStore
          });
        }

      });
    } else {
      this.alertService.showError('Please add Name or Phone Store');
    }
  }
  closeModal() {
    this.modalController
      .dismiss()
      .then();
  }
}
