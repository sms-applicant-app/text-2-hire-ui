import { Component, OnInit } from '@angular/core';
import {OnboardingService} from "../../../shared/services/onboarding.service";

@Component({
  selector: 'app-create-new-hire-package',
  templateUrl: './create-new-hire-package.component.html',
  styleUrls: ['./create-new-hire-package.component.scss'],
})
export class CreateNewHirePackageComponent implements OnInit {
  title: string;
  constructor(public onboadService: OnboardingService) { }

  ngOnInit() {
    this.title = 'Brandons Form Upload';
  }
  getOnboardingByStore(storeId){
    this.onboadService.getAllOnboardingPackagesByStoreId(storeId);
  }
}
