import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {AddStoreComponent} from './shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddFranchiseComponent} from './shared-components/components/add-franchise/add-franchise.component';
import {AngularFireAuth} from "@angular/fire/auth";
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
    { title: 'Log out', url: '/logout', icon: 'logout' },

  ];
    showStoresByHiringManager: boolean;
    showStoresByFranchise: boolean;
    userData: any;
    isLoggedIn: boolean;
  constructor(public authService: AuthService,
              public modalController: ModalController,
              public ngFireAuth: AngularFireAuth) {}
  ngOnInit() {
      this.userData = JSON.parse(localStorage.getItem('appUserData'));
      if(this.userData){
        if (this.userData.role === 'franchisee'){
          // get all stores for the franchise
          this.showStoresByFranchise = true;
        }
        if (this.userData.role === 'hiringManager'){
          // get stores for the hiring manager
          this.showStoresByHiringManager = true;
        }
      } else {
        this.showStoresByFranchise = false;
        this.showStoresByHiringManager = false;
      }

  }
  async addFranchise(){
    const franchiseOwner = this.userData.email;
    console.log('display add franchise');
    const addFranchise = await this.modalController.create({
      component: AddFranchiseComponent,
      swipeToClose: true,
      componentProps: {
        franchiseOwner
      }
    });
    return await addFranchise.present();
  }
}
