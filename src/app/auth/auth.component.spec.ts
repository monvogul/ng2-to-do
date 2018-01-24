import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { MaterialComponentModule } from '../material-component.module';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let de: DebugElement ;
  let authServ ;
  let router;

 const testUser = {
    uid: '123',
    displayName: 'testUser'
  };

  const testGithubUser = {
    uid: '234',
    displayName: 'testGitUser'
  };

  const testGoogleUser = {
    uid: '345',
    displayName: 'testGoogleUser'
  };

  beforeEach(async(() => {
   class AuthServiceStub {
       user = {};

       get currentUserName(){
         return this.user['displayName'] ;
       }

       loginWithGitHub() {
        return Promise.resolve(this.user) ;
       }

       loginWithGoogle() {
        return Promise.resolve(this.user) ;
       }

       logOut() {
        return Promise.resolve(null) ;
      }
    }

   class RouterStub {
    navigate() {}
   }

    TestBed.configureTestingModule({
      imports: [MaterialComponentModule, BrowserAnimationsModule],
      declarations: [ AuthComponent ],
      providers: [
           {provide: AuthService, useClass: AuthServiceStub},
           {provide: Router, useClass: RouterStub}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authServ = TestBed.get(AuthService) ;
    router = TestBed.get(Router) ;
    fixture.detectChanges();
  });

  it('should show Login option if user is not logged in', () => {
    authServ.user = null ;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('span.login'));

    expect(de.nativeElement.textContent).toMatch(/login/i, '"login"');
  });


  it('should show logged in username', () => {
    authServ.user = testUser;
    fixture.detectChanges();

    de =  fixture.debugElement.query(By.css('span.username'));
    const username = de.nativeElement.textContent ;

    expect(username).toContain('testUser');
  });

  it('should login with github', fakeAsync(() => {
   const spy = spyOn(router, 'navigate') ;

   component.githubLogin();
   tick() ;
   authServ.user = testGithubUser;
   fixture.detectChanges();

    de =  fixture.debugElement.query(By.css('span.username'));
    const username = de.nativeElement.textContent ;

    expect(username).toContain(testGithubUser.displayName);
    expect(spy).toHaveBeenCalledWith(['/notes']) ;
  }));

  it('should login with google', fakeAsync(() => {
    const spy = spyOn(router, 'navigate') ;

    component.googleLogin();
    tick() ;
    authServ.user = testGoogleUser;
    fixture.detectChanges();

     de =  fixture.debugElement.query(By.css('span.username'));
     const username = de.nativeElement.textContent ;

     expect(username).toContain(testGoogleUser.displayName);
     expect(spy).toHaveBeenCalledWith(['/notes']) ;
   }));

   it('should logout user and retutn to home page', fakeAsync(() => {
    const spy = spyOn(router, 'navigate') ;

    component.signOut();
    tick() ;

    authServ.user = null;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('span.login'));

    expect(de.nativeElement.textContent).toMatch(/login/i, '"login"');
    expect(spy).toHaveBeenCalledWith(['/']) ;
   }));

});
