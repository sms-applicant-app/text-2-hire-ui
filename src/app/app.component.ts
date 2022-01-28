import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {AddStoreComponent} from './shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddFranchiseComponent} from './shared-components/components/add-franchise/add-franchise.component';
import {AngularFireAuth} from "@angular/fire/auth";
import { Router } from '@angular/router';
import { roleName } from './shared/constants/role';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    /*{ title: 'Home', url: '/admin', icon: 'home' },
    { title: 'Franchises', url: '/franchise', icon: 'mail' },
    { title: 'Stores', url: '/store', icon: 'storefront' },
    { title: 'Add A Franchise', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Metrics', url: '/folder/Archived', icon: 'archive' },*/
    { title: 'Log out', url: '/logout', icon: 'log-out-outline' },

  ];
    userData: any;
    isLoggedIn: boolean;
    roleName: string;
  constructor(public authService: AuthService,
              public modalController: ModalController,
              public ngFireAuth: AngularFireAuth,
              public router: Router,) {}
  ngOnInit() {
    this.authService.appUserData = JSON.parse(localStorage.getItem('appUserData'));
    setTimeout(() => {
      switch (this.authService.appUserData.role) {
        case roleName.FRANCHISEE:
          this.roleName = 'Franchisee';
          break;
        case roleName.ADMIN:
          this.roleName = 'Admin';
          break;
        case roleName.HIRING_MANAGER:
          this.roleName = 'Hiring Manager';
          break;
        default:
          break;
      }
    }, 2000);
  }
  async addFranchise(){
    const franchiseOwner = this.authService.userData.email;
    const addFranchise = await this.modalController.create({
      component: AddFranchiseComponent,
      swipeToClose: true,
      componentProps: {
        franchiseOwner
      }
    });
    return await addFranchise.present();
  }

  goToPage(url: string) {
    if(url == '/logout') {
      this.authService.SignOut();
    } else {
      this.router.navigate([url]);
    }
  }
}
