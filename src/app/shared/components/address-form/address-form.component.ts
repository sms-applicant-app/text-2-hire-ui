import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.initiadressForm();
    //TODO get user id on init from or after registration
  }
  initiadressForm(){
    this.addressForm = this.fb.group({
      userId: [''],
      Address1: ['',
        [Validators.required]
      ],
      Address2: ['',
      ],
      State: ['', [
        Validators.required]
      ],
      City: ['', [
        Validators.required]
      ],
      Zip: ['',
        [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)]],
      

    })
  }



}
