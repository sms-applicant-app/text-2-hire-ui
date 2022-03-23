import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FranchiseListComponent} from './components/franchise-list/franchise-list.component';
import {ApplicantListComponent} from './components/applicant-list/applicant-list.component';
import {StoreListByFranchiseComponent} from './components/store-list-by-franchise/store-list-by-franchise.component';
import {JobsListComponent} from './components/jobs-list/jobs-list.component';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FranchiseDetailsComponent} from './components/franchise-details/franchise-details.component';
import {AddStoreComponent} from './components/add-store/add-store.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {AngularMaterialModule} from '../app-material/angular-material.module';
import {AddUserComponent} from '../admin/admin-franchise-list/add-user/add-user.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {UploadFormComponent} from './components/upload-form/upload-form.component';
import {UploadDetailsComponent} from './components/upload-details/upload-details.component';
import {UploadListComponent} from './components/upload-list/upload-list.component';
import {CreateNewHirePackageComponent} from './components/create-new-hire-package/create-new-hire-package.component';
import {RegisterApplicantComponent} from "./components/register-applicant/register-applicant.component";
import {AddJobReqComponent} from "./components/add-job-req/add-job-req.component";
import {UsersForFranchiseListComponent} from "./components/users-for-franchise-list/users-for-franchise-list.component";
import {StoresByHiringManagerComponent} from "./components/stores-by-hiring-manager/stores-by-hiring-manager.component";
import {AddFranchiseComponent} from "./components/add-franchise/add-franchise.component";
import {ApplicantDetailsComponent} from "./components/applicant-details/applicant-details.component";
import {ApplicantTableRowComponent} from "./components/applicant-table-row/applicant-table-row.component";
import {AddOnBoardPacketComponent} from "./components/add-on-board-packet/add-on-board-packet.component";
import { UploadListFormComponent } from './components/upload-list-file/upload-list-form.component';
import {EditPositionComponent} from "./components/edit-position/edit-position.component";

@NgModule({
  declarations:
    [FranchiseListComponent,
    ApplicantListComponent,
      ApplicantDetailsComponent,
      StoreListByFranchiseComponent,
      JobsListComponent,
      AddressFormComponent,
      FranchiseDetailsComponent,
      AddStoreComponent,
      RegisterUserComponent,
      AddUserComponent,
      UploadFormComponent,
      UploadDetailsComponent,
      UploadListComponent,
      CreateNewHirePackageComponent,
      RegisterApplicantComponent,
      AddJobReqComponent,
      UsersForFranchiseListComponent,
      StoresByHiringManagerComponent,
      AddFranchiseComponent,
      ApplicantTableRowComponent,
      AddOnBoardPacketComponent,
      UploadListFormComponent,
      EditPositionComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,

  ],
    exports: [FranchiseListComponent,
        ApplicantListComponent,
        AddOnBoardPacketComponent,
        StoreListByFranchiseComponent,
        JobsListComponent,
        AddressFormComponent,
        FranchiseDetailsComponent,
        RegisterUserComponent,
        UploadFormComponent,
        UploadDetailsComponent,
        UploadListComponent,
        CreateNewHirePackageComponent,
        RegisterApplicantComponent,
        AddJobReqComponent,
        AddStoreComponent,
        StoresByHiringManagerComponent,
        AddFranchiseComponent,
        ApplicantTableRowComponent,
        UploadListFormComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]

})
export class SharedComponentsModule { }
