import { InactiveUser } from './../../../shared/models/inactiveUser';
import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FranchiseService} from '../../../shared/services/franchise.service';
import {Franchisee} from '../../../shared/models/franchisee';
import {FirestoreHelperService} from '../../../shared/firestore-helper.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {ModalController} from '@ionic/angular';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {AddStoreComponent} from '../add-store/add-store.component';
import {UserService} from "../../../shared/services/user.service";
import {StoreService} from "../../../shared/services/store.service";
import { AlertService } from '../../../shared/services/alert.service';
import { InactiveUserService } from './../../../shared/services/inactiveUser.service';
import { JobService } from './../../../shared/services/job.service';
@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.scss'],
})
export class FranchiseListComponent implements OnInit, OnChanges  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() franchiseData: Franchisee[];
  dataSource: MatTableDataSource<Franchisee>;
  displayColumns= ['businessLegalName', 'dateCreated', 'phoneNumber', 'corporateEmail', 'dba', 'actions'];
  storeData: any = [];
  selectedFranchise: Franchisee = new Franchisee();
  displayRegistrationForm: boolean;
  isAddingFranchiseOwner: boolean;
  bodyText: string;
  userId: string;
  userData: any;
  inactiveUser: InactiveUser = new InactiveUser();
  constructor(
    public modalController: ModalController,
    public dbHelper: FirestoreHelperService,
    public router: Router,
    public authService: AuthService,
    public userService: UserService,
    public storeService: StoreService,
    public liveAnnouncer: LiveAnnouncer,
    public alertService: AlertService,
    public franchiseService: FranchiseService,
    public inactiveUserService: InactiveUserService,
    public jobService: JobService,
  ) {}

  ngOnInit() {
    this.displayRegistrationForm = false;
  }
  ngOnChanges(){
    this.handleTable();
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

  deleteFranchise(franchise) {
    console.log('franchise', franchise);
    this.alertService.alertConfirm('franchisee and all relevant data this belong to this one?').then((data) => {
      if (data) {
        this.inactiveUser = {
          franchiseId: franchise.id,
          businessLegalName: franchise.businessLegalName,
          corporateEmail: franchise.corporateEmail,
          addressId: franchise.addressId,
          phoneNumber: franchise.phoneNumber
        };
        this.franchiseService.deleteFranchise(franchise.id).then(res => {
          this.deleteStores(franchise.id);
          this.deleteJobs(franchise.id);
          this.deleteUsers(franchise.id);
          this.inactiveUserService.createInactiveUser(this.inactiveUser);
          this.alertService.showSuccess(`Delete ${franchise.businessLegalName} success`);
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }
  deleteStores(franchiseId) {
    this.storeService.deleteStoresByFranchiseId(franchiseId);
  }
  deleteJobs(franchiseId) {
    this.jobService.deleteJobsByFranchiseId(franchiseId);
  }
  deleteUsers(franchiseId) {
    this.userService.deleteUsersByFranchiseId(franchiseId);
  }
}
