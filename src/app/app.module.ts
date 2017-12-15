import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { MaterialComponentModule } from './material-component.module';
import { AppComponent } from './app.component';
import {TodoHeaderComponent} from "./header/todo-header/todo-header.component";
import {NotesService} from "./notes-list/notes.service";
import {FormsModule} from "@angular/forms";

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
    TodoHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    MaterialComponentModule

  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
