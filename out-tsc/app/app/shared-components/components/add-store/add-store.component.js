import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '../../../shared/models/store';
import { v4 as uuidv4 } from 'uuid';
import { MatStepper } from '@angular/material/stepper';
import * as firebase from 'firebase';
import { GeneratedStoreId } from '../../../shared/models/generatedStoreId';
import { MatTableDataSource } from "@angular/material/table";
let AddStoreComponent = class AddStoreComponent {
    constructor(dbHelper, datePipe, fb, router, navCtrl, storeService, firestore, userService, jobService) {
        this.dbHelper = dbHelper;
        this.datePipe = datePipe;
        this.fb = fb;
        this.router = router;
        this.navCtrl = navCtrl;
        this.storeService = storeService;
        this.firestore = firestore;
        this.userService = userService;
        this.jobService = jobService;
        this.storeAddedEvent = new EventEmitter();
        this.newStore = new Store();
        this.newGeneratedStoreId = new GeneratedStoreId();
        this.currentStepIndex = 0;
        this.hiringManagers = [];
        this.displayColumns = ['name', 'phoneNumber', 'actions'];
    }
    ngOnInit() {
        this.userId = JSON.parse(localStorage.getItem('user')).email;
        this.addAddress = false;
        this.addingNewUser = false;
        console.log('franchiseId in query', this.franchiseId, this.storeIsAddedByAdmin);
        this.userService.getUsersByFranchise(this.franchiseId);
        /* this.firestore.doc(`users/${this.userId}`).get().subscribe(doc => {
           this.userData = doc.data();
     
           this.franchiseId = this.storeIsAddedByAdmin? this.userData.franchiseId : this.franchiseIdFromList;
         });*/
        this.storeService.getLastGeneratedStoreId();
        this.createStoreForm();
        console.log('incoming franchise Id', this.franchiseId);
        this.addStoreAddress();
        this.initialStoreId = '001';
        this.getHiringManagersPerFranchise();
    }
    createDate() {
        this.date = new Date();
        this.latestDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');
        return this.latestDate;
    }
    createStoreForm() {
        this.addStoreForm = this.fb.group({
            storePhoneNumber: [''],
            storeName: ['']
        });
    }
    addStoreAddress() {
        this.addressId = uuidv4();
        this.addAddress = true;
        this.addressType = 'Store';
    }
    addNewUserToStore() {
        this.addingNewUser = true;
    }
    addExistingUser() {
        // get franchise id then get all users by Franchise Id
    }
    receiveAddressMessage($event) {
        console.log('address added', $event);
        this.addressAdded = $event;
        if ($event) {
            this.createStoreUniqueId();
            console.log('go to next step', this.addressAdded);
        }
    }
    selectionChange(e) {
        console.log('store step', e);
    }
    receiveUserMessage($event) {
        this.newUserHiringManagerData = $event;
        console.log('user added', $event);
    }
    goBack(stepper) {
        console.log('stepper index', stepper);
        stepper.previous();
    }
    goForward(stepper) {
        console.log('stepper index', stepper);
        stepper.next();
    }
    createStoreUniqueId() {
        // change state to HN for hirenow later we can make better unique ID
        this.storeService.getLastGeneratedStoreId();
        console.log('last used generated store Id from DB', this.lastUsedStoreId);
        this.newStore.storeId = 'HN002';
        /*  if(this.lastUsedStoreId){
            this.lastUsedStoreId.toString();
            const removedState = this.lastUsedStoreId.replace(this.addressAdded.state, '');
            const toNum = Number(removedState);
            const incrementOne = toNum + 1;
            const statePlusGenID = this.addressAdded.state + incrementOne;
            this.newStore.storeId = statePlusGenID;
            console.log( 'generated store ID', statePlusGenID, this.storeUniqueId, toNum);
          } else {
            this.storeUniqueId = 'HN' + this.initialStoreId;
            this.newStore.storeId = this.storeUniqueId;
            console.log('else statement storeId', this.newStore.storeId);
          }*/
    }
    getHiringManagersPerFranchise() {
        this.firestore.collection('users', ref => ref.where('role', '==', 'hiringManager').where('franchiseId', '==', this.franchiseId)).get()
            .subscribe(users => {
            this.hiringManagers = [];
            if (users.docs.length === 0) {
                console.log('no hiring managers for this store');
            }
            else {
                users.forEach(data => {
                    const u = data.data();
                    this.hiringManagers.push(u);
                    this.dataSource = new MatTableDataSource(this.hiringManagers);
                    console.log(this.hiringManagers.length, ' hiring managers', this.hiringManagers);
                });
            }
        });
    }
    addHiringManagerToStore(userId) {
        // update hiring manager by assigning the store to id to their user object
        // if new user create User if existing just update user
        this.existingHiringManagerId = userId;
        const storeId = this.newStore.storeId;
        this.userService.updateUser(userId, { storeIds: storeId });
    }
    addStore() {
        this.createDate();
        this.newStore.franchiseId = this.franchiseId;
        this.newStore.storeName = this.addStoreForm.controls.storeName.value;
        this.newStore.storePhoneNumber = this.addStoreForm.controls.storePhoneNumber.value;
        this.newStore.addressId = this.addressAdded.addressId;
        this.newStore.storeId = '003';
        this.newStore.createdDate = firebase.default.firestore.FieldValue.serverTimestamp();
        this.newStore.storeHiringManager = this.addingNewUser ? this.newUserHiringManagerData.userId : this.existingHiringManagerId;
        this.storeService.createStore(this.newStore).then((resp) => {
            this.storeId = JSON.parse(localStorage.getItem('added-storeId'));
            this.newGeneratedStoreId.generatedStoreId = this.storeUniqueId;
            this.newGeneratedStoreId.storeId = this.storeId;
            this.newGeneratedStoreId.createdAt = firebase.default.firestore.FieldValue.serverTimestamp();
            this.storeService.addGeneratedStoreId(this.newGeneratedStoreId).then();
        });
    }
};
__decorate([
    Input()
], AddStoreComponent.prototype, "storeIsAddedByAdmin", void 0);
__decorate([
    Input()
], AddStoreComponent.prototype, "franchiseIdFromList", void 0);
__decorate([
    Input()
], AddStoreComponent.prototype, "franchiseId", void 0);
__decorate([
    Output()
], AddStoreComponent.prototype, "storeAddedEvent", void 0);
AddStoreComponent = __decorate([
    Component({
        selector: 'app-add-store',
        templateUrl: './add-store.component.html',
        styleUrls: ['./add-store.component.scss'],
        providers: [DatePipe, MatStepper]
    })
], AddStoreComponent);
export { AddStoreComponent };
//# sourceMappingURL=add-store.component.js.map