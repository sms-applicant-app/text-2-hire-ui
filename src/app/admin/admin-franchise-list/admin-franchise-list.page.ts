import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-franchise-list',
  templateUrl: './admin-franchise-list.page.html',
  styleUrls: ['./admin-franchise-list.page.scss'],
})
export class AdminFranchiseListPage implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(
  ) {

  }
  goBack() {
    this.router.navigate(['admin']);
  }
}
