import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FranchiseService} from '../../../shared/services/franchise.service';
import {Franchisee} from '../../../shared/models/franchisee';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {uniqid} from 'uniqid';
import {ModalController, NavParams} from '@ionic/angular';
import {User} from '../../../shared/models/user';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {AddStoreComponent} from '../add-store/add-store.component';
import {UserService} from "../../../shared/services/user.service";
import {StoreService} from "../../../shared/services/store.service";
import { AlertService } from '../../../shared/services/alert.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() franchisee: Franchisee[];
  ID: any;
  dataSource: MatTableDataSource<Franchisee>;
  displayColumns= ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'actions'];
  franchiseData: any = [];
  storeData: any = [];
  selectedFranchise: Franchisee = new Franchisee();
  displayRegistrationForm: boolean;
  isAddingFranchiseOwner: boolean;
  bodyText: string;
  userId: string;
  userData: any;
  constructor(
    public modalController: ModalController,
    public dbHelper: FirestoreHelperService,
    public router: Router,
    public authService: AuthService,
    public userService: UserService,
    public storeService: StoreService,
    public liveAnnouncer: LiveAnnouncer,
    public alertService: AlertService,
    public franchiseService: FranchiseService
  ) {}

  ngOnInit() {
    this.getFranchisee();
    this.displayRegistrationForm = false;
  }
  getFranchisee(){
    this.franchiseData = [];
    this.dbHelper.collectionWithIds$('franchisee', ref => ref.orderBy('dateCreated', 'desc')).subscribe(data => {
      if (data) {
        this.franchiseData = data;
        this.franchiseData.forEach(franchise => {
          franchise.dateCreated = franchise.dateCreated.toDate();
        });
        this.handleTable();
      }
    });
  }

  handleTable() {
    this.dataSource = new MatTableDataSource<Franchisee>(this.franchiseData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  announceSortChange(sortState: Sort) {
    console.log('sortState', sortState);
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  handledActiveUser(franchise) {
    console.log('franchise', franchise);
    this.alertService.confirmChangeStatus('Franchisee').then((data) => {
      if (data) {
        let dataUpdate = {};
        if (franchise.isActive === true) {
          // deactive franchise
          franchise.isActive = false;
          dataUpdate = {
            isActive: false,
          }
        } else {
          // active franchise
          franchise.isActive = true;
          dataUpdate = {
            isActive: true,
          }
        }

        // update store, job, 
        this.franchiseService.updateFranchise(franchise.id, dataUpdate).then(res => {
          console.log('res', res)
        });
      }
    });
  }
}
