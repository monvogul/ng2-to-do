import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { MaterialComponentModule } from '../material-component.module';
import { TodoHeaderComponent } from './todo-header.component';

describe('TodoHeaderComponent', () => {
  let component: TodoHeaderComponent;
  let fixture: ComponentFixture<TodoHeaderComponent>;
  let de: DebugElement ;
  let authServ;
  let router;

  const testUser = {
    uid: '123',
    displayName: 'testUser'
  };

  beforeEach(async(() => {
    class AuthServiceStub {
      user;
    }

    class RouterStub {
      navigate() {}
    }

    TestBed.configureTestingModule({
      imports: [ MaterialComponentModule, BrowserAnimationsModule ],
      declarations: [ TodoHeaderComponent, AuthComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoHeaderComponent);
    component = fixture.componentInstance;
    authServ = TestBed.get(AuthService) ;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should disable My Notes link if user is not logged in', () => {
   de = fixture.debugElement.query(By.css('a[routerLink=notes]'));
    expect(de.classes.disabled).toBeTruthy();
  });

  it('should enable My Notes link if user is logged in', () => {
    authServ.user = testUser ;
    fixture.detectChanges() ;
    de = fixture.debugElement.query(By.css('a[routerLink=notes]'));
     expect(de.classes.disabled).toBeFalsy();
   });

   });
