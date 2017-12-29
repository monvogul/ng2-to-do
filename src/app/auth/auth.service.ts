import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import GithubAuthProvider = firebase.auth.GithubAuthProvider;
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  user:any
  constructor(public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe((user) => {
      this.user = user ;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.user.uid : '';
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  logOut() {
    return this.afAuth.auth.signOut() ;
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
  }

}
