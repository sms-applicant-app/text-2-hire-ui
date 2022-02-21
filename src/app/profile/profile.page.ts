import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../shared/services/user.service';
import { matchingPasswords, phoneValidator } from '../shared/utils/app-validators';
import { FirestoreHelperService } from '../shared/firestore-helper.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  appUserData: any;
  formEditUser: FormGroup;
  formChangePass: FormGroup;
  isEditForm: boolean;
  isChangePass: boolean;
  userEmail: string;
  isCalling: boolean;
  isProfilePage: boolean;
  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    public dbHelper: FirestoreHelperService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isEditForm = false;
    this.isChangePass = false;
    this.isCalling = false;
    // this.route.queryParams.subscribe(params => {
    //     console.log('params', params);
    //     this.isProfilePage = 
    // });
    this.initForm();
    this.getUserData();
    this.initFormChangePass();
  }
  initForm() {
    this.formEditUser = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneValidator]],
    });
  }
  initFormChangePass() {
    this.formChangePass = this.fb.group(
      {
        newPassWord: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchingPasswords('newPassWord', 'confirmPassword') }
    );
  }

  getUserData() {
    // this.userService.getUserById(email).subscribe((data: any) =>{
    //   this.appUserData = data;
    // });
     this.appUserData = JSON.parse(localStorage.getItem('appUserData'));
     console.log(this.appUserData);
     this.userEmail = this.appUserData.email;
     this.formEditUser.patchValue({
      fullName: this.appUserData.fullName,
      phoneNumber: this.appUserData.phoneNumber
     });
  }

  changeModeEdit() {
    this.isEditForm = true;
  }

  backProfile() {
    this.isChangePass = false;
  }

  backToStore() {
    this.location.back();
  }

  update() {
    if (this.formEditUser.valid) {
      this.isCalling = true;
      const user = {
        fullName: this.formEditUser.value.fullName,
        phoneNumber: this.formEditUser.value.phoneNumber
      };
      const userId = this.userEmail;
      this.dbHelper.set(`users/${userId}`, user).then((ress) => {
        console.log('ress', ress);
        const newUserData = {
          dateCreated: this.appUserData.dateCreated,
          email: this.appUserData.email,
          firstName: this.appUserData.firstName,
          franchiseId: this.appUserData.franchiseId,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          role: this.appUserData.role,
          updatedAt: this.appUserData.updatedAt
        };
        localStorage.setItem('appUserData', JSON.stringify(newUserData));
        this.isCalling = false;
        // this.userService.getUserById(userId).subscribe((data: any) =>{
        //   this.appUserData = data;
        //   localStorage.setItem('appUserData', JSON.stringify(data));
        // });
      }).catch((err) => {
        console.log('err', err);
      });
    }

  }

  changePassword() {
    this.isChangePass = true;
  }

  goBack() {
    this.isChangePass = false;
  }
}
