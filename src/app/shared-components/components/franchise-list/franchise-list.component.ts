import { Component, OnInit } from '@angular/core';
import {FranchiseService} from "../../../shared/services/franchise.service";
import {Franchisee} from "../../../shared/models/franchisee";

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit {
  dataSource  = [];
  franchise: Franchisee;
  constructor(private franchiseService:  FranchiseService) { }
  tableColumns  :  string[] = ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'employeeId'];
  ngOnInit()
   {
     this.franchiseService.getFranchises().subscribe((data: any) =>{
       console.log('returned', data)
       const franchisesToString = data.toString()
       const franchiseToJson = JSON.parse(franchisesToString)
       this.dataSource = data
     })
   }

}
