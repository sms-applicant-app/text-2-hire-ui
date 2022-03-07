import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {AddStoreComponent} from './shared-components/components/add-store/add-store.component';
import {ModalController} from '@ionic/angular';
import {AddFranchiseComponent} from './shared-components/components/add-franchise/add-franchise.component';
import {AngularFireAuth} from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { roles } from './shared/constants/role';
import {AngularFirestore} from "@angular/fire/firestore";
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
  hiringManager: any =[];
  userData: any;
  isLoggedIn: boolean;
  roleName: string;
  isProfilePage: boolean;
  constructor(public authService: AuthService,
              public modalController: ModalController,
              public ngFireAuth: AngularFireAuth,
              public router: Router,
              public firestore: AngularFirestore) {}
  ngOnInit() {
    this.authService.appUserData = JSON.parse(localStorage.getItem('appUserData'));
    this.routerChange();
   // this.cleanUpHiringManagersWithNoCalendarLink();
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
 /* cleanUpHiringManagersWithNoCalendarLink(){
    this.firestore.collection('users', ref => ref.where('role', '==', 'hiringManager')).get()
      .subscribe(ss =>{
        this.hiringManager = [];
        if(ss.docs.length === 0){
          console.log('no hiring managers');
        } else {
          ss.forEach(hm =>{
            console.log(hm.data());
            const id = hm.id;
          this.hiringManager.push(id, hm.data());
            if (this.hiringManager.calendlyLink === null){
              const hms = hm.data();
              for(let i=0; i < this.hiringManager.length; i++){
                if (hms[i].calendly === undefined){
                  console.log('hm with no calendly', hms);
                }
              }
            }
          });
        }
      });
  }*/
  goToPage(url: string) {
    if(url === '/logout') {
      this.authService.SignOut();
    } else {
      this.router.navigate([url]);
    }
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
