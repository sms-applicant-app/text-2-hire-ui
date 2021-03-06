import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FranchiseService} from "../../../shared/services/franchise.service";
import {Franchisee} from "../../../shared/models/franchisee";
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../shared/services/store.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-franchise-details',
  templateUrl: './franchise-details.component.html',
  styleUrls: ['./franchise-details.component.scss'],
})
export class FranchiseDetailsComponent implements OnInit, OnChanges {
  @Input() franchisee: Franchisee;
  @Input() franchiseId: string;
  currentFranchise: Franchisee = null;
  franchiseData: any;


  constructor(
    public franchiseService: FranchiseService,
    public storeService: StoreService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.franchiseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getFranchiseDetail();
  }

  getFranchiseDetail() {
    this.franchiseData = this.franchiseService.getFranchiseById(this.franchiseId).subscribe((res) => {
      if (res) {
        this.franchiseData = res;
      }
    }) ;
  }
  ngOnChanges(): void {
    this.currentFranchise = { ...this.franchisee };
  }

}
