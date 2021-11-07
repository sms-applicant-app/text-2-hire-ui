import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-multi-alert',
  templateUrl: './multi-alert.component.html',
  styleUrls: ['./multi-alert.component.scss'],
})
export class MultiAlertComponent implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit() {}

}
