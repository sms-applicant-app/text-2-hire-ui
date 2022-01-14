import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Address } from "../../../shared/models/address";
let AddressFormComponent = class AddressFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.messageEvent = new EventEmitter();
        this.newAddress = new Address();
    }
    ngOnInit() {
        console.log('address id =', this.addressId);
        console.log('address type = ', this.addressType);
        this.initAddressForm();
        this.addressAdded = false;
        //TODO get user id on init from or after registration
    }
    initAddressForm() {
        this.addressForm = this.fb.group({
            streetAdd1: ['',
                [Validators.required]
            ],
            streetAdd2: ['',
            ],
            state: ['', [
                    Validators.required
                ]
            ],
            city: ['', [
                    Validators.required
                ]
            ],
            zip: ['',
                [Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(5)]]
        });
    }
    submitAddress() {
        this.newAddress.addressId = this.addressId;
        this.newAddress.addressType = this.addressType;
        this.newAddress.streetAdd1 = this.addressForm.controls.streetAdd1.value;
        this.newAddress.streetAdd2 = this.addressForm.controls.streetAdd2.value;
        this.newAddress.state = this.addressForm.controls.state.value;
        this.newAddress.zipCode = this.addressForm.controls.zip.value;
        this.newAddress.city = this.addressForm.controls.city.value;
        this.addressAdded = true;
        this.sendMessage();
    }
    sendMessage() {
        this.messageEvent.emit(this.newAddress);
    }
};
__decorate([
    Input()
], AddressFormComponent.prototype, "addressId", void 0);
__decorate([
    Input()
], AddressFormComponent.prototype, "addressType", void 0);
__decorate([
    Output()
], AddressFormComponent.prototype, "messageEvent", void 0);
AddressFormComponent = __decorate([
    Component({
        selector: 'app-address-form',
        templateUrl: './address-form.component.html',
        styleUrls: ['./address-form.component.scss'],
    })
], AddressFormComponent);
export { AddressFormComponent };
//# sourceMappingURL=address-form.component.js.map