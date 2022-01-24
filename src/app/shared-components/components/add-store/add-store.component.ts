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
import * as firebase from 'firebase';
import {UserService} from '../../../shared/services/user.service';
import {GeneratedStoreId} from '../../../shared/models/generatedStoreId';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../shared/models/user';
import {JobService} from '../../../shared/services/job.service';
import { Subject } from 'rxjs';



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
  lastGeneratedId: any;
  displayColumns= ['name', 'phoneNumber', 'actions'];
  onStoreAddedSub: Subject<Store>;
  
  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public navCtrl: NavController,
    public storeService: StoreService,
    public firestore: AngularFirestore,
    public userService: UserService,
    public jobService: JobService


  ) { }

  ngOnInit() {
    
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.addAddress = false;
    this.addingNewUser = false;
   // console.log('franchiseId in query', this.franchiseId, this.storeIsAddedByAdmin);
    this.userService.getUsersByFranchise(this.franchiseId);
   /* this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
      this.userData = doc.data();

      this.franchiseId = this.storeIsAddedByAdmin? this.userData.franchiseId : this.franchiseIdFromList;
    });*/

    this.createStoreForm();
    console.log('incoming franchise Id', this.franchiseId);
    this.addStoreAddress();
    this.initialStoreId = '005';
    this.getHiringManagersPerFranchise();
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

  receiveAddressMessage($event){
    console.log('address added', $event);
    this.addressAdded = $event;
    if($event){
      this.getLastGeneratedStoreId();
    console.log('go to next step', this.addressAdded);
    }
  }

  selectionChange(e) {
    console.log('store step', e);
  }

  receiveUserMessage($event){
    this.newUserHiringManagerData = $event;
    console.log('user added', this.newUserHiringManagerData.email);
    this.newStore.storeHiringManager = this.newUserHiringManagerData.email;
    this.getHiringManagersPerFranchise();
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
          const id = 0o01;
          this.newGeneratedStoreId.generatedStoreId = 0o000101;
          this.newGeneratedStoreId.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
          this.storeService.addGeneratedStoreId(this.newGeneratedStoreId).then(data=>{
            console.log('added generated store Id');
          });
        }
        ss.docs.forEach(doc => {
          this.lastGeneratedId = doc.data();
          console.log('retrieving last used store Id', this.lastGeneratedId.generatedStoreId, 'doc data =', doc.data());
          const lastId = this.lastGeneratedId.generatedStoreId;
          this.createStoreUniqueId(lastId);
        });
      });
  }
  createStoreUniqueId(lastId){
    // change state to HN for hirenow later we can make better unique ID

    console.log('last used generated store Id from DB',lastId);
    let increment = 0;
    increment = 1;
    this.newStore.storeId = +increment + lastId;
    this.newGeneratedStoreId.generatedStoreId = this.newStore.storeId;
    console.log('new store id plus 1 =', this.newStore.storeId);

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
            console.log(this.hiringManagers.length, ' hiring managers', this.hiringManagers);
          });
        }
      });
  }
  addHiringManagerToStore(userId){
    // update hiring manager by assigning the store to id to their user object
    // if new user create User if existing just update user
    if(this.addingNewUser === true){
      this.newStore.storeHiringManager = this.newStore.storeId;
    }
    this.existingHiringManagerId = userId;
    const storeId = this.newStore.storeId;
    this.userService.updateUser(userId, { storeIds: storeId });

  }
  addStore(){
    this.createDate();
   // this.createStoreUniqueId();
    this.newStore.franchiseId = this.franchiseId;
    this.newStore.storeName = this.addStoreForm.controls.storeName.value;
    this.newStore.storePhoneNumber = this.addStoreForm.controls.storePhoneNumber.value;
    this.newStore.addressId = this.addressAdded.addressId;
    this.newStore.storeId = this.newGeneratedStoreId.generatedStoreId;
    this.newStore.createdDate = firebase.default.firestore.FieldValue.serverTimestamp();
    this.storeService.createStore(this.newStore).then((resp: any) =>{
      this.storeId = JSON.parse(localStorage.getItem('added-storeId'));
      this.newGeneratedStoreId.storeId = this.storeId;
      this.newGeneratedStoreId.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
      this.storeService.addGeneratedStoreId(this.newGeneratedStoreId).then();
      this.onStoreAddedSub.next({
        ...this.newStore
      });
    });
  }
}
