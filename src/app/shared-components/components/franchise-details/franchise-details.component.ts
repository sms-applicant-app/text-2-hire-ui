import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FranchiseService} from "../../../shared/services/franchise.service";
import {Franchisee} from "../../../shared/models/franchisee";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-franchise-details',
  templateUrl: './franchise-details.component.html',
  styleUrls: ['./franchise-details.component.scss'],
})
export class FranchiseDetailsComponent implements OnInit, OnChanges {
  @Input() franchisee: Franchisee
  @Input() franchiseId: string;
  currentFranchise: Franchisee = null


  constructor(public franchiseService: FranchiseService) { }

  ngOnInit() {
    console.log('franchise ID =', this.franchiseId);

      this.franchiseService.getFranchiseById(this.franchiseId).subscribe(data =>{
        console.log('franchise details', data);
      });




  }
  ngOnChanges(): void {
    this.currentFranchise = { ...this.franchisee };
  }

}
