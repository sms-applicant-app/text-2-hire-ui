import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirestoreHelperService} from "../../shared/firestore-helper.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

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
    public router: Router
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
  addStore(){

  }

}
