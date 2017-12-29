import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import {NotesListComponent} from "./notes-list/notes-list.component";
import {AuthGuard} from "./auth/auth.guard";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";


 export const routes: Routes = [
   {path: '',component: HomeComponent},
   { path: 'notes', component: NotesListComponent, canActivate:[AuthGuard] },
   {path: '**', redirectTo: '/', pathMatch: 'full'},

 ];
@NgModule({
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule{}
