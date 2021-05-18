import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.page.html',
  styleUrls: ['./franchise.page.scss'],
})
export class FranchisePage implements OnInit {
  addressForm: FormGroup
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }
  initiadressForm(){
    this.addressForm = this.fb.group({

    })
  }

}
