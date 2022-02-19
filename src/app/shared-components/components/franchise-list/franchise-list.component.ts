import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FranchiseService} from '../../../shared/services/franchise.service';
import {Franchisee} from '../../../shared/models/franchisee';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {uniqid} from 'uniqid';
import {ModalController, NavParams} from '@ionic/angular';
import {User} from '../../../shared/models/user';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {AddStoreComponent} from '../add-store/add-store.component';
import {UserService} from "../../../shared/services/user.service";
import {StoreService} from "../../../shared/services/store.service";

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input',  {static: true}) filter: ElementRef;
  @Input() franchisee: Franchisee[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ID: any;
  dataSource: MatTableDataSource<Franchisee>;
  franchisees: Franchisee[];
  franchiseData: any = [];
  storeData: any = [];
  selectedFranchise: Franchisee = new Franchisee();
  displayRegistrationForm: boolean;
  displayColumns= ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'actions'];
  isAddingFranchiseOwner: boolean;
  bodyText: string;
  userId: string;
  userData: any;


  constructor(public modalController: ModalController,
              private franchiseService:  FranchiseService,
              public dbHelper: FirestoreHelperService,
              public router: Router,
              public authService: AuthService,
              public userService: UserService,
              public storeService: StoreService
  ) {
    this.dbHelper.collectionWithIds$('franchisee').subscribe(data => {
      this.franchiseData = data;
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      this.dataSource = new MatTableDataSource<Franchisee>(this.franchiseData);
      setTimeout(() =>{
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit()
   {
    this.getFranchisee();
    this.displayRegistrationForm = false;

   }


    getFranchisee(){
    this.franchisees = [];
      this.dbHelper.collectionWithIds$('franchisee').subscribe((data: []) => {
        this.franchisees = data;
      });
    }
    async addUserToFranchise(franchiseId){
    // show email password and role to register
      this.displayRegistrationForm = true;
     const userModal = await this.modalController.create({
       component: RegisterUserComponent,
       swipeToClose: true,
       componentProps: {
        franchiseId
       }
     });
      return await userModal.present();

    }
    export(){

    }
  getFranchiseDetails(franchiseId){
    //show stores card with list of jobs 2 cards one with users, stores
    this.router.navigate([`/admin/admin-franchise-details/${franchiseId}`]);

  }
   async addStoreToFranchise(franchiseId){
    const storeIsAddedByAdmin = true;
    const isAdminDashBoard = true;
      const addStoreModel = await this.modalController.create({
        component: AddStoreComponent,
        swipeToClose: true,
        componentProps: {
          franchiseId,
          storeIsAddedByAdmin,
          isAdminDashBoard
        }
      });
      return await addStoreModel.present();
    }
}
