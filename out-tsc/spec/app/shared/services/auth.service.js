import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import firebase from 'firebase';
let AuthService = class AuthService {
    constructor(afStore, ngFireAuth, router, ngZone, alertController, userService) {
        this.afStore = afStore;
        this.ngFireAuth = ngFireAuth;
        this.router = router;
        this.ngZone = ngZone;
        this.alertController = alertController;
        this.userService = userService;
        this.isLogin = false;
        this.ngFireAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                //  console.warn('SET USER', user);
                JSON.parse(localStorage.getItem('user'));
            }
            else {
                localStorage.setItem('user', null);
                //  console.warn('USER IS NULL');
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }
    adminSignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
            console.log('result from log in', result);
            this.ngFireAuth.authState.subscribe(user => {
                if (user) {
                    this.userData = user;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    //  console.warn('SET USER', user);
                    JSON.parse(localStorage.getItem('user'));
                }
                else {
                    localStorage.setItem('user', null);
                    //  console.warn('USER IS NULL');
                    JSON.parse(localStorage.getItem('user'));
                }
            });
            this.userService.getUserById(email).subscribe((data) => {
                console.log(data.role, 'returned from log in');
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
            this.userService.getUserById(email).subscribe((data) => {
                console.log(data, 'returned from log in');
                localStorage.setItem('appUserData', JSON.stringify(data));
                this.ngZone.run(() => {
                    this.router.navigateByUrl('store', { state: { franchiseId: data.franchiseId } });
                });
            });
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
    get isEmailVerified() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
    }
    // Sign in with Gmail
    /* GoogleAuth() {
       return this.AuthLogin(new auth.GoogleAuthProvider());
     }*/
    getProvider() {
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
        const userRef = this.afStore.doc(`users/${user.uid}`);
        const userData = {
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
            console.log('logged out cleared storage');
            // TEMP: SEND LOGGED OUT USER TO MAIN PAGE TO CLEAR STORAGE DURING DEV
            this.router.navigate(['']);
        });
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map