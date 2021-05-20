import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreHelperService } from 'src/app/shared/firestore-helper.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-franchice',
  templateUrl: './add-franchice.component.html',
  styleUrls: ['./add-franchice.component.scss'],
})
export class AddFranchiceComponent implements OnInit {
  addFranchiseForm: FormGroup;
  registrationForm: FormGroup;

  /***
   * Form Validation .....************
   */
  validation_messages = {
    businessLegalName: [
      { type: 'required', message: 'Enter your email to login' },
      { type: 'email', message: 'Must be a valid email' },
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' },
      // { type: 'minlength', message: 'Display Name must be at least 4 characters long.' },
      // { type: 'maxlength', message: 'Display Name cannot be more than 25 characters long.' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'minlength', message: 'Phone Number must be at least 7 characters long.' },
      { type: 'maxlength', message: 'Phone Number cannot be more than 15 characters long.' }
    ],
  };



  constructor(public fb: FormBuilder,
    public dbHelper: FirestoreHelperService,
    public authService: AuthService,
    public router: Router
    ) { }



  ngOnInit() {
    this.initProfileForm();
    this.initRegistrationForm();
  }


  initProfileForm(): void{
    this.addFranchiseForm = this.fb.group({
      businessLegalName:  ['', [ Validators.required]
      ],

      phoneNumber: ['',
       [ Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)]
      ],
      expectedHireRatePerMonth: ['',
      [Validators.required]
  ],
    });
  }
  initRegistrationForm(): void{
      this.registrationForm = this.fb.group({
        email: [''],
        password: ['']
      })
  }
  registerFranchise(email, password){
    this.authService.RegisterUser(email.value, password.value).then(res => {
      console.log('response from registration', res)
    })
  }

  goToFranchiseDetails(){
    this.router.navigateByUrl('/franchise-details');
}

}
