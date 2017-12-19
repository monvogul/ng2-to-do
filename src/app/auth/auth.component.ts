import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth, AUTH_PROVIDERS} from 'angularfire2/auth';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {

 constructor(private authService: AuthService) { }

  githubLogin()  {
   this.authService.loginWithGitHub();

  }

  // signOut(){
  //   this.authService.logOut().then(value => console.log(value)) ;
  // }


}
