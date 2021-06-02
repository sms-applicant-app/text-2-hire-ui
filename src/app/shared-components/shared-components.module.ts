import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FranchiseListComponent} from "./components/franchise-list/franchise-list.component";
import {ApplicantListComponent} from "./components/applicant-list/applicant-list.component";
import {StoreListComponent} from "./components/store-list/store-list.component";
import {JobsListComponent} from "./components/jobs-list/jobs-list.component";
import {AddressFormComponent} from "./components/address-form/address-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {FranchiseDetailsComponent} from "./components/franchise-details/franchise-details.component";
import {AddStoreComponent} from "./components/add-store/add-store.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {AngularMaterialModule} from "../app-material/angular-material.module";
import {UserDetailsComponent} from "./components/user-details/user-details.component";



@NgModule({
  declarations: [FranchiseListComponent, ApplicantListComponent, StoreListComponent, JobsListComponent, AddressFormComponent, FranchiseDetailsComponent, AddStoreComponent, RegisterUserComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [FranchiseListComponent, ApplicantListComponent, StoreListComponent, JobsListComponent, AddressFormComponent, FranchiseDetailsComponent, RegisterUserComponent, UserDetailsComponent]
})
export class SharedComponentsModule { }
