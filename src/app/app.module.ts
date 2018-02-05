import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TodoHeaderComponent } from './header/todo-header.component';
import { HomeComponent } from './home/home.component';
import { MaterialComponentModule } from './material-component.module';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesService } from './notes-list/notes.service';


export const firebaseConfig = {
  apiKey: 'AIzaSyB3I5iDYBBU-rjye8GDPBp48joBSyLYxB8',
  authDomain: 'ng-to-do-afb25.firebaseapp.com',
  databaseURL: 'https://ng-to-do-afb25.firebaseio.com',
  projectId: 'ng-to-do-afb25',
  storageBucket: '',
  messagingSenderId: '367214937827'
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    TodoHeaderComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    MaterialComponentModule,
    AngularFireAuthModule,
    AppRoutingModule,
    RouterModule.forRoot(  [{path: 'home', component: HomeComponent}])

  ],
  providers: [NotesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
