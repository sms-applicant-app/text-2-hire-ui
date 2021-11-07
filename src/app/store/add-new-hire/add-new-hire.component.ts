import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-new-hire',
  templateUrl: './add-new-hire.component.html',
  styleUrls: ['./add-new-hire.component.scss'],
})
export class AddNewHireComponent implements OnInit {
  @Input() applicant: any;
  constructor() { }

  ngOnInit() {
    console.log('incoming applicant', this.applicant);
  }

}
