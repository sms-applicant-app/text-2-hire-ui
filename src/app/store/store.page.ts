import { Component, OnInit } from '@angular/core';
import {FranchiseService} from '../shared/services/franchise.service';
import {AddStoreComponent} from "../shared-components/components/add-store/add-store.component";
import {ModalController} from "@ionic/angular";
import {AddJobReqComponent} from "../shared-components/components/add-job-req/add-job-req.component";

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  franchiseId: string;

  constructor(public franchiseService: FranchiseService, public modelController: ModalController) { }

  ngOnInit() {
    this.franchiseId = JSON.parse(localStorage.getItem('user')).franchiseId;
    this.franchiseService.getFranchiseOwner(this.franchiseId).subscribe(data => [
      console.log('franchise data', data)
    ]);
  }
    async addJobRec(){
      const franchiseId = this.franchiseId;
      console.log('display add Job Model');
      const addJobRec = await this.modelController.create({
        component: AddJobReqComponent,
        swipeToClose: true,
        componentProps: {
          franchiseId
        }
      });
      return await addJobRec.present();
    }

  // todo Create Job modal comes up with basic job listing attributes and works through a wizard

  // todo Open Job Recs = list all job reqs under that hiring manager

  // todo List All Applicants by store

  // todo interview someone set up a page to embed Typeform interviewer questions

  // todo hire manager side nav should have stores listed
}
