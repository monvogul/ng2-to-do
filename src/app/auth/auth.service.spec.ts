import { fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService ;
  let mockAngularFireAuth;

  const authUser = {
    user: {
    displayName: 'testUser',
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
    }
  };

  const afterLoginUser = {
    credential: {
      accessToken: 'asdfjkasdjf823uif'
    },
    user: {
      displayName: 'loggedInUser',
     uid: '1hsdfh892dsflfj3kajdfkj38kdc2'
    }
  };


  beforeEach(() => {
     mockAngularFireAuth = {
      auth: jasmine.createSpyObj('auth', {
        'signInWithPopup': Promise.resolve(afterLoginUser),
        'signOut': Promise.resolve(null)
          }),
      authState: new Subject<firebase.User>()
    };
    service = new AuthService(mockAngularFireAuth as AngularFireAuth) ;

    });

    it('should have the Firebase Auth instance', () => {
      expect(service.afAuth.auth).toBeDefined();
    });

    it('should log user in using social signin', fakeAsync( () => {
      service.loginWithGitHub().then(user  => mockAngularFireAuth.authState.next(user.user) );
       tick();
       expect(service.user).toBeTruthy() ;
      } ));

   it('should set user after successful sign', () => {
      mockAngularFireAuth.authState.next(authUser.user) ;
      expect(service.user).toBe(authUser.user) ;
    });

    it('should not have user details after logout', fakeAsync( () => {
      service.logOut().then(voidUser  => mockAngularFireAuth.authState.next(voidUser) );
       tick();
       expect(service.user).toBeFalsy() ;
      } ));

      it('should not subscribe to authUser changes after unsubscribing', () => {
        service.ngOnDestroy();
        mockAngularFireAuth.authState.next(authUser.user) ;
        expect(service.user).not.toBe(authUser.user) ;
      });






});
