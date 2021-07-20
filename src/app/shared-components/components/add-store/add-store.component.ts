import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Store} from '../../../shared/models/store';
import { v4 as uuidv4 } from 'uuid';
import {NavController} from '@ionic/angular';
import {MatStepper} from '@angular/material/stepper';
import {StoreService} from '../../../shared/services/store.service';
import {AngularFirestore} from '@angular/fire/firestore';

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
  date;
  latestDate: string;
  currentStepIndex: number = 0;
  storeId: string;
  addingNewUser: boolean;
  userId: string;
  storeUniqueId: string;

  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public navCtrl: NavController,
    public storeService: StoreService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.addAddress = false;
    this.addingNewUser = false;
    console.log('franchiseId in query', this.franchiseId, this.storeIsAddedByAdmin);
   /* this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
      this.userData = doc.data();

      this.franchiseId = this.storeIsAddedByAdmin? this.userData.franchiseId : this.franchiseIdFromList;
    });*/
    this.createStoreForm();
    console.log('incoming franchise Id', this.franchiseId);
    this.addStoreAddress();
  }
  createDate() {
    this.date = new Date();
    this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');

    return this.latestDate;
  }
  createStoreForm(){
    this.addStoreForm = this.fb.group({
      storePhoneNumber: [''],
      storeName: ['']
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
  addExistingUser(){
    // get franchise id then get all users by Franchise Id
  }
  receiveAddressMessage($event){
    console.log('address added', $event);
    this.addressAdded = $event;
    if($event){
    console.log('go to next step', this.addressAdded);
    }
  }
  createStoreUniqueId(phoneNumber){
    //const lastFour = this.addStoreForm.controls.storePhoneNumber.value;
    const four = (phoneNumber.slice(phoneNumber - 5));
    this.storeUniqueId = this.addressAdded.state + four;
    console.log(four, 'unique storeId',this.storeUniqueId);
  }
  selectionChange(e) {
    console.log('store step', e);
  }

  receiveUserMessage($event){
    console.log('user added', $event);
  }
  goBack(stepper: MatStepper){
    console.log('stepper index', stepper);
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    console.log('stepper index', stepper);
    stepper.next();
  }
  addStore(){
    this.createDate();
    this.newStore.franchiseId = this.franchiseId;
    this.newStore.storeName = this.addStoreForm.controls.storeName.value;
    this.newStore.storePhoneNumber = this.addStoreForm.controls.storePhoneNumber.value;
    this.newStore.addressId = this.addressAdded.addressId;
    this.newStore.createdDate = this.latestDate;
    this.createStoreUniqueId(this.newStore.storePhoneNumber);
    this.newStore.storeId = this.storeUniqueId;
    this.storeService.createStore(this.newStore).then((resp: any) =>{
      console.log('store added', resp, JSON.stringify(resp));
      this.storeId = JSON.parse(localStorage.getItem('added-storeId'));
    });
  }

}
