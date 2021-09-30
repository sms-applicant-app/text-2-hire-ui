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
    // Login in with email/password
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password).then((data) => {
            if (data) {
                const displayName = data.user.displayName;
                // If the user exists and nothing is in LocalStorage yet, store it there.
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    this.userService.getUserById(email).subscribe(resp => {
                        localStorage.setItem('appUserData', JSON.stringify(resp));
                    });
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
            localStorage.clear();
            // TEMP SEND LOGGED OUT USER TO MAIN PAGE TO CLEAR STORAGE DURING DEV
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