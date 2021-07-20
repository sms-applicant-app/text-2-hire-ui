import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FranchiseService} from '../shared/services/franchise.service';
import {ModalController} from '@ionic/angular';
import {AddStoreComponent} from '../shared-components/components/add-store/add-store.component';
import {AddJobReqComponent} from '../shared-components/components/add-job-req/add-job-req.component';
import {RegisterUserComponent} from '../shared-components/components/register-user/register-user.component';

import {Address} from '../shared/models/address';


@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.page.html',
  styleUrls: ['./franchise.page.scss'],
})
export class FranchisePage implements OnInit {

  addressForm: FormGroup;
  franchiseId: string;
  franchiseOwner: string;
  userId: string;
  isLoading: boolean;
  constructor(public fb: FormBuilder,
              public actRoute: ActivatedRoute,
              public router: Router,
              public franchiseService: FranchiseService,
              public modalController: ModalController
  ) {
              const navigation = this.router.getCurrentNavigation();
              const state = navigation.extras.state;

  }

  ngOnInit() {
    this.isLoading = true;
    this.franchiseOwner = '';
    this.userId = JSON.parse(localStorage.getItem('user')).email;
    this.getFranchiseOwnerByUserId(this.userId);
  }
  receiveFranchiseIdMessage($event){
    this.franchiseId = $event;
  }
  getFranchiseOwnerByUserId(id){
    this.franchiseService.getFranchiseOwner(id).subscribe(user =>{
      console.log(user.franchiseId, 'users franchiseId');
      this.franchiseId = user.franchiseId;
      this.franchiseOwner = user.fullName;
      this.isLoading = false;
    });
  }
  async addStore(){
    const franchiseId = this.franchiseId;
    console.log('display add store');
    const addStoreModel = await this.modalController.create({
      component: AddStoreComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId
      }
    });
    return await addStoreModel.present();
  }
  async addJobRec(){
    const franchiseId = this.franchiseId;
    console.log('display add job model');
    const addJobModel = await this.modalController.create({
      component: AddJobReqComponent,
      swipeToClose: true,
      componentProps: {
        // may need franchise id
        franchiseId
      }
    });
    return await addJobModel.present();
  }
  async addUser(){
    const franchiseId = this.franchiseId;
    console.log('display add job model');
    const addJobModel = await this.modalController.create({
      component: RegisterUserComponent,
      swipeToClose: true,
      componentProps: {
        // may need franchise id
        franchiseId
      }
    });
    return await addJobModel.present();
  }
  showStoresListByFranchiseId(){
    this.router.navigate(['/franchise/list-stores']);
  }


  // todo list stores component modal by franchise

  // todo add user calls registration component

}
