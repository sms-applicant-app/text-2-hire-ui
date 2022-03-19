import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {AddStoreComponent} from './shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddFranchiseComponent} from './shared-components/components/add-franchise/add-franchise.component';
import {AngularFireAuth} from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { roles } from './shared/constants/role';
import { FranchiseService } from './shared/services/franchise.service';
import { AlertService } from './shared/services/alert.service';
import { take } from 'rxjs/operators';
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
  isProfilePage: boolean;
  constructor(public authService: AuthService,
              public modalController: ModalController,
              public ngFireAuth: AngularFireAuth,
              public router: Router,
              public franchiseService: FranchiseService,
              public alertService: AlertService) {}
  ngOnInit() {
    this.authService.appUserData = JSON.parse(localStorage.getItem('appUserData'));
    // recheck franchise owner active status
    if(this.authService.appUserData && this.authService.appUserData.franchiseId) {
      this.franchiseService.getFranchiseById(this.authService.appUserData.franchiseId).pipe(take(1)).subscribe((franchise: any) => {
        // check franchise status
        if(franchise && franchise.isActive === false) {
          this.alertService.showError('Franchise is not active. User is not allowed to access this application.');
          this.authService.SignOut();
        }
      });
    }
    this.routerChange();
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
    this.router.navigate(['logout']);
  }
  goProfile() {
    this.router.navigate(['profile']);
  }
  getUserRole(){
    const appUserData = JSON.parse(localStorage.getItem('appUserData'));
    return appUserData?.role;
  }
  getUserRoleName(){
    return roles[`${this.authService.appUserData?.role}`];
  }

  routerChange() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('profile')) {
          this.isProfilePage = true;
        } else {
          this.isProfilePage = false;
        }
      }
    });
  }
}
