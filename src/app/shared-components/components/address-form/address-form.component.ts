import { AlertService } from './../../../shared/services/alert.service';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Address} from "../../../shared/models/address";
import { AddressService } from '../../../shared/services/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() addressId: any;
  @Input() addressType: any;
  @Output() messageEvent = new EventEmitter<Address>();
  addressAdded: boolean;
  //addressId: string;
  addressForm: FormGroup;
  newAddress: Address = new Address();

  constructor(
    public fb: FormBuilder,
    public alertService: AlertService,
    public addressService: AddressService
    ) { }

  ngOnInit() {
    this.initAddressForm();
    this.addressAdded = false;
    //TODO get user id on init from or after registration

  }
  initAddressForm(){
    this.addressForm = this.fb.group({
      streetAdd1: ['',
        [Validators.required]
      ],
      streetAdd2: ['',
      ],
      state: ['', [
        Validators.required]
      ],
      city: ['', [
        Validators.required]
      ],
      zip: ['',
        [ Validators.required,
          Validators.minLength(5)]]
    });
  }
  submitAddress(){
    if (this.addressForm.valid) {
      console.log('this.addressId', this.addressId);
      this.newAddress.addressId = this.addressId;
      this.newAddress.addressType = this.addressType;
      this.newAddress.streetAdd1 = this.addressForm.controls.streetAdd1.value;
      this.newAddress.streetAdd2 = this.addressForm.controls.streetAdd2.value;
      this.newAddress.state = this.addressForm.controls.state.value;
      this.newAddress.zipCode = this.addressForm.controls.zip.value;
      this.newAddress.city = this.addressForm.controls.city.value;
      this.addressService.createAddress(this.newAddress);
      this.addressAdded = true;
      this.sendMessage();
    } else {
      this.alertService.showError('Please enter field');
    }
  }
  sendMessage() {
    this.messageEvent.emit(this.newAddress);
  }

}
