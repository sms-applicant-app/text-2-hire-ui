import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-franchise-dashboard',
  templateUrl: './franchise-dashboard.page.html',
  styleUrls: ['./franchise-dashboard.page.scss'],
})
export class FranchiseDashboardPage implements OnInit {
  franchiseId: string;
  constructor(public actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params =>{
      this.franchiseId = params.get('id');
    });
  }

}
