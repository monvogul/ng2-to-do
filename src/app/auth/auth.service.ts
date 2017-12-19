import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import GithubAuthProvider = firebase.auth.GithubAuthProvider;
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  user$: Observable<firebase.User> ;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState ;
  }

  loginWithGoogle() {
     this.afAuth.auth.signInWithRedirect(new GoogleAuthProvider());
  }
  loginWithGitHub() {
    this.afAuth.auth.signInWithRedirect(new GithubAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut() ;
  }
}
