import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {FranchiseService} from "../shared/services/franchise.service";

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
  constructor(public fb: FormBuilder,
              public actRoute: ActivatedRoute,
              public router: Router,
              public franchiseService: FranchiseService
  ) {
              const navigation = this.router.getCurrentNavigation();
              const state = navigation.extras.state;
              this.userId = state.userId;
  }

  ngOnInit() {
    this.getFranchiseOwnerByUserId(this.userId);
  }
  getFranchiseOwnerByUserId(id){
    this.franchiseService.getFranchiseOwner(id).subscribe(user =>{
      console.log(user);
    });
  }

}
