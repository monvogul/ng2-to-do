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
