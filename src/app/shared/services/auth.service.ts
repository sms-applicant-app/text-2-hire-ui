import { Injectable, NgZone } from '@angular/core';


import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from '../models/user';

import {stringify} from 'querystring';

import {AlertController} from '@ionic/angular';
import {first} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  profileData: any;

  user: User;
  isLogin = false;
  roleAs: string;
  constructor(
      public afStore: AngularFirestore,
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      public alertController: AlertController
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      //  console.warn('SET USER', user);
        JSON.parse(localStorage.getItem('user'));
        const displayName = this.userData.displayName;

      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('displayName', null);
      //  console.warn('USER IS NULL');
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password).then((data: any) => {
      if (data) {
        const displayName = data.user.displayName;
        // If the user exists and nothing is in LocalStorage yet, store it there.
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));

        }

      }
    });
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

  // Returns true when user is looged in
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
      localStorage.clear();
      // TEMP SEND LOGGED OUT USER TO MAIN PAGE TO CLEAR STORAGE DURING DEV
      this.router.navigate(['']);
    });
  }

}
