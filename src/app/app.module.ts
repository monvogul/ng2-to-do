import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { MaterialComponentModule } from './material-component.module';
import { AppComponent } from './app.component';
import {TodoHeaderComponent} from './header/todo-header/todo-header.component';
import {NotesService} from './notes-list/notes.service';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import {routes, AppRoutingModule} from "./app-routing.module";
import {NotesListComponent} from "./notes-list/notes-list.component";
import {HomeComponent} from "./home/home.component";


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
    RouterModule.forRoot(routes)

  ],
  providers: [NotesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
