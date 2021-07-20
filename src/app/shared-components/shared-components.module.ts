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
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {CarListComponentComponent} from './car-list-component/car-list-component.component';

import {AddUserComponent} from '../admin/admin-franchise-list/add-user/add-user.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {UploadFormComponent} from './components/upload-form/upload-form.component';
import {UploadDetailsComponent} from './components/upload-details/upload-details.component';
import {UploadListComponent} from './components/upload-list/upload-list.component';
import {CreateNewHirePackageComponent} from './components/create-new-hire-package/create-new-hire-package.component';
import {RegisterApplicantComponent} from "./components/register-applicant/register-applicant.component";
import {AddJobComponent} from "../jobs/add-job/add-job.component";
import {AddJobReqComponent} from "./components/add-job-req/add-job-req.component";





@NgModule({
  declarations:
    [FranchiseListComponent,
    ApplicantListComponent,
      StoreListByFranchiseComponent,
      JobsListComponent,
      AddressFormComponent,
      FranchiseDetailsComponent,
      AddStoreComponent,
      RegisterUserComponent,
      UserDetailsComponent,
      CarListComponentComponent,
      AddUserComponent,
      UploadFormComponent,
      UploadDetailsComponent,
      UploadListComponent,
      CreateNewHirePackageComponent,
      RegisterApplicantComponent,
      AddJobReqComponent
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
        StoreListByFranchiseComponent,
        JobsListComponent,
        AddressFormComponent,
        FranchiseDetailsComponent,
        RegisterUserComponent,
        UserDetailsComponent,
        CarListComponentComponent,
        UploadFormComponent,
        UploadDetailsComponent,
        UploadListComponent,
        CreateNewHirePackageComponent,
        RegisterApplicantComponent,
        AddJobReqComponent, AddStoreComponent
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
