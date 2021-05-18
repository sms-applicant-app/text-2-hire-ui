import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-aplicants',
  templateUrl: './list-aplicants.component.html',
  styleUrls: ['./list-aplicants.component.scss'],
})
export class ListAplicantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // TODO get all applicants by store id and maybe franchise first by store
  }

}
