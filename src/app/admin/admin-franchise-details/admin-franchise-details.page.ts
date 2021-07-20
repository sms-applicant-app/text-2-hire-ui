import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-franchise-details',
  templateUrl: './admin-franchise-details.page.html',
  styleUrls: ['./admin-franchise-details.page.scss'],
})
export class AdminFranchiseDetailsPage implements OnInit {
  franchiseId: string;
  franchiseIdFromList: string;
  constructor() { }

  ngOnInit() {
  }

}
