import { async } from '@angular/core/testing';
import { UserInterface } from './../models/user.model';
import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../shared/services/user';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  currentUserSubject = new Subject<any>();
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.getUser(user.uid);
        this.userData = user;
        console.log(user.uid);
        this.getUser(user.uid);
      } else {
        await localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.newCurrentUserNotification(null);
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['back-order']));
        });
        console.log(result.user);
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert('email ou mot de passe incorrecte');
      });
  }

  // Sign up with email/password
  SignUp(data: UserInterface) {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        const user =  {
          uid: result.user.uid,
          email: result.user.email,
          displayName: data.displayName,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
          phoneNumber: data.phoneNumber,
          roles: data.roles,
          district: data.district
        };
        console.log(result.user.displayName);
        console.log(user);
        result.user.updateProfile({
          displayName: data.displayName
        });
        this.SetUserData(user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  /* // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  } */

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Un email a été envoyé, verifiez votre messagerie.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  // Auth logic to run providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['back-order']);
        });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  /* Setting up user data when sign in with username/password
  sign up with username/password and sign in with social
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserInterface = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    if (user['displayName'] ) {
      userData['displayName'] = user['displayName'];
    } if (user['photoURL']) {
      userData['photoURL'] = user['photoURL'];
    } if (user['phoneNumber'] ) {
      userData['phoneNumber'] = user['phoneNumber'];
    } if (user['district'] && user['district'] !== '') {
      userData['district'] = user['district'];
    } if (user['roles'] && user['roles'] !== '') {
      userData['roles'] = user['roles'];
    }
    return userRef.set(userData, {
      merge: true
    });
  }
  getUser (uid) {
    return this.afs.collection('users').doc(uid).valueChanges().subscribe( async result => {
      console.log(result);
       /*  const data = changes.payload.data();
      const id = changes.payload.id;
      data['uid'] = id; */
      console.log(result);
      await localStorage.setItem('user', JSON.stringify(result));
      const self = this;
      setTimeout(async function() {
        await self.newCurrentUserNotification(result);
        JSON.parse(localStorage.getItem('user'));
      }, 1500);
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
      const self = this;
      setTimeout(async function() {
        await self.newCurrentUserNotification(JSON.parse(localStorage.getItem('user')));
      }, 1500);
    });
  }
  getCurrentUser(): String {
    const user = this.afAuth.currentUser.then((value) => {
      console.log(value);
      return value.uid;
    });
    return null;
  }
  public getCurrentNotification(): Observable<any> {

    return this.currentUserSubject.asObservable();
  }
  /** this creat notification */
  public newCurrentUserNotification(value): any {
    this.currentUserSubject.next(value);
  }
}
