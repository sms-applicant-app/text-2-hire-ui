import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FranchiseService} from "../../../shared/services/franchise.service";
import {Franchisee} from "../../../shared/models/franchisee";
import {FirestoreHelperService} from "../../../shared/firestore-helper.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {ModalService} from "../../../shared/services/modal.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input',  {static: true}) filter: ElementRef;
  @Input() franchisee: Franchisee[]
  ID: any;
  dataSource: MatTableDataSource<Franchisee>;
  franchisees: Franchisee[];
  franchiseData: any = []
  selectedFranchise: Franchisee = new Franchisee();
  displayRegistrationForm: boolean;
  displayColumns= ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'actions'];

  isAddingFranchiseOwner: boolean;
  bodyText: string;


  constructor(public modalService: ModalController, private franchiseService:  FranchiseService, public dbHelper: FirestoreHelperService, public router: Router, public authService: AuthService) {
    this.dbHelper.collectionWithIds$('franchisee').subscribe(data => {
      this.franchiseData = data
      this.dataSource = new MatTableDataSource<Franchisee>(this.franchiseData);
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator;
      }, 0)
    })
  }

  ngOnInit()
   {
    this.getFranchisee()
     this.displayRegistrationForm = false
   }


    getFranchisee(){
    this.franchisees = []
      this.dbHelper.collectionWithIds$('franchisee').subscribe((data:[]) => {
        console.log(data)
        this.franchisees = data;
      });
    }
    addUserToFranchise(modalId){
    // show email password and role to register
      this.displayRegistrationForm = true


    }

    addStoreToFranchise(id){

    }
}
