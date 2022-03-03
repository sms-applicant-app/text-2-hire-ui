import { Injectable, NgZone } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from '../models/user';

import {AlertController} from '@ionic/angular';
import {first, take} from 'rxjs/operators';
import {of} from 'rxjs';
import firebase from 'firebase';
import {UserService} from './user.service';
import {Store} from '../models/store';
import { AlertService } from '../../shared/services/alert.service';
import {toastMess} from '../../shared/constants/messages';
import { FranchiseService } from './franchise.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  appUserData: any;
  profileData: any;

  user: User;
  isLogin = false;
  roleAs: string;
  constructor(
      public afStore: AngularFirestore,
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      public alertController: AlertController,
      public userService: UserService,
      public alertService: AlertService,
      public franchiseService: FranchiseService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      //  console.warn('SET USER', user);
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
      //  console.warn('USER IS NULL');
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getRole() {
    const appUserData = JSON.parse(localStorage.getItem('appUserData')).role;
    return appUserData;
  }
  adminSignIn(email, password){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)

      .then((result) => {
        console.log('result from log in', result);
        this.ngFireAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            //  console.warn('SET USER', user);
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            //  console.warn('USER IS NULL');
            JSON.parse(localStorage.getItem('user'));
          }
        });
        this.userService.getUserById(email).subscribe((data: any) => {
          console.log(data.role, 'returned from log in');
          this.appUserData = data;
          localStorage.setItem('appUserData', JSON.stringify(data));
          this.routeUserBasedOnRole(data.role);
        });
       // localStorage.setItem('appUserData', JSON.stringify(result))
      });
  }
  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userService.getUserById(email).subscribe((data: any) => {
          this.ngZone.run(() => {
            if(!data) {
              this.alertService.showError('User not found');
              return;
            }

            if(data.franchiseId) {
              this.franchiseService.getFranchiseById(data.franchiseId).pipe(take(1)).subscribe((franchise: any) => {
                // check franchise status
                if(franchise && franchise.isActive === false) {
                  this.alertService.showError('Login error. Franchise is not active.');
                } else {
                  this.appUserData = data;
                  localStorage.setItem('appUserData', JSON.stringify(data));
                  this.router.navigateByUrl('store', {state: {franchiseId: data.franchiseId}});
                  this.alertService.showSuccess(toastMess.LOGIN_SUCCESS);
                }
              });
            } else {
              this.appUserData = data;
              localStorage.setItem('appUserData', JSON.stringify(data));
              this.router.navigateByUrl('store', {state: {franchiseId: data.franchiseId}});
              this.alertService.showSuccess(toastMess.LOGIN_SUCCESS);
            }
          });
        });
  }).catch((err) => {
    this.alertService.showError(err.message);
    });
  }
  routeUserBasedOnRole(userRole) {
    console.log('user role', userRole);
    /*if (userRole === 'franchisee' && this.firstTimeLogin === true){
      this.router.navigate(['admin/admin-add-franchise']);
    }*/
    /*  if (userRole === 'franchisee' && this.firstTimeLogin !== true){
        const navigationExtras: NavigationExtras ={
          state: {
            userId: this.userId
          }
        };
        this.router.navigate(['franchise'], navigationExtras);
        console.log('Route Franchisee');
      }*/
    // combining user roles for franchise and hiring manager to minimize change management on the dashboard
    if (userRole === 'hiringManager') {
      console.log('route by user role', userRole);
      this.router.navigate(['store']);
    }
    if (userRole === 'admin') {
      this.router.navigate(['admin']);
    }
  }
  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
        .then(() => {
          console.log('sent');
        });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email has been sent, please check your inbox.');
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Returns true when user is logged in
   isLoggedIn() {
    return this.ngFireAuth.authState.pipe(first());
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
 /* GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }*/
  getProvider(){
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider from user to sign up with ', provider);
    return provider;
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: { uid: any; photoURL: any; emailVerified: any; displayName: any; email: any } = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('appUserData');
      localStorage.clear();
      this.userData = null;
      this.appUserData = null;
      console.log('logged out cleared storage');
      // TEMP: SEND LOGGED OUT USER TO MAIN PAGE TO CLEAR STORAGE DURING DEV
      this.router.navigate(['']);
    });
  }

}
