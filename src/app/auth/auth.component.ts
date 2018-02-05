import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { visibilityAnimation } from '../app-animations';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [ visibilityAnimation]
})
export class AuthComponent  {

 showLoginOptions = false;

 constructor(public authService: AuthService, private  router: Router) { }

  githubLogin()  {
   this.authService.loginWithGitHub().then(() => {
     this.router.navigate(['/notes']);
   }).catch(error => {
     alert(error);
   });

  }

  googleLogin()  {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(['/notes']);
    }).catch(error => {
      alert(error);
    });

  }

  signOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/']);
    })
  .catch(error => {
      alert(error);
    })  ;
  }


}
