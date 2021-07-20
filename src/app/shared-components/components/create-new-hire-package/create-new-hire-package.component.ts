import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-hire-package',
  templateUrl: './create-new-hire-package.component.html',
  styleUrls: ['./create-new-hire-package.component.scss'],
})
export class CreateNewHirePackageComponent implements OnInit {
  title: string;
  constructor() { }

  ngOnInit() {
    this.title = 'Brandons Form Upload';
  }

}
