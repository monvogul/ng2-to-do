import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/do' ;
import 'rxjs/add/operator/map' ;
import * as firebase from 'firebase';


@Injectable()
export class AuthGuard implements CanActivate {

  user$: Observable<firebase.User> ;

  constructor(private auth: AuthService, private router: Router){
   this.user$ = auth.afAuth.authState ;
  }

  canActivate(): Observable<boolean> {

       return this.user$
         .map((authState) => {
           return !!authState ;
       })
         .do(authState => {
           if (!authState) {
             this.router.navigate(['/']);
           }
         });

    }
}
