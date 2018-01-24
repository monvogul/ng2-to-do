import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('visibilityAnimation', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('true => false', animate('300ms')),
      transition('false => true', animate('500ms')),
    ])
  ]
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
