import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotesListComponent } from './notes-list/notes-list.component';


 export const routes: Routes = [
   {path: 'home', component: HomeComponent},
   { path: 'notes', component: NotesListComponent, canActivate:[AuthGuard] },
   {path: '**', redirectTo: 'home', pathMatch: 'full'},

 ];
@NgModule({
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule{}
