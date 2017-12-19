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
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {AngularFireAuthModule} from "angularfire2/auth";


export const firebaseConfig = {
  
}
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TodoHeaderComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    MaterialComponentModule,
    AngularFireAuthModule
  ],
  providers: [NotesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
