import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {

  @Input() franchiseId: string;
  @Input() addressId: string;
  businessLegalName: string;
  addStoreForm: FormGroup;
  userData: any;
  constructor(
    public dbHelper: FirestoreHelperService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    public router: Router,
    public modelController: ModalController
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }
  createStoreForm(){
    this.addStoreForm = this.fb.group({
      storeNumber: ['', Validators.required],
      storePhoneNumber: ['', [Validators.required]],

    });
  }
  async addStore(){
    let franchiseId;
    console.log('display add store');
    const addStoreModel = await this.modelController.create({
      component: AddStoreComponent,
      swipeToClose: true,
      componentProps: {
        franchiseId
      }
    });
    return await addStoreModel.present();
  }

}
