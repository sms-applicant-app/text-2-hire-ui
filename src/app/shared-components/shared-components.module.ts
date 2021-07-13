import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FranchiseListComponent} from './components/franchise-list/franchise-list.component';
import {ApplicantListComponent} from './components/applicant-list/applicant-list.component';
import {StoreListComponent} from './components/store-list/store-list.component';
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





@NgModule({
  declarations:
    [FranchiseListComponent,
    ApplicantListComponent,
      StoreListComponent,
      JobsListComponent,
      AddressFormComponent,
      FranchiseDetailsComponent,
      AddStoreComponent,
      RegisterUserComponent,
      UserDetailsComponent,
      CarListComponentComponent,
      AddUserComponent
    ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
  ],
  exports: [FranchiseListComponent, ApplicantListComponent, StoreListComponent, JobsListComponent, AddressFormComponent, FranchiseDetailsComponent, RegisterUserComponent, UserDetailsComponent, CarListComponentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]

})
export class SharedComponentsModule { }
