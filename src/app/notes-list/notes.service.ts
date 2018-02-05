import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {queryDef} from '@angular/core/src/view';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map' ;
import {AngularFireObject} from 'angularfire2/database/interfaces';

@Injectable()
export class NotesService {

  itemsRef: AngularFireList<any>;
  userId: string;
  constructor(private db: AngularFireDatabase, public authServ: AuthService) {
    this.userId = authServ.currentUserId;

    this.itemsRef = this.db.list('/users/' + this.userId + '/notes', ref => {
            return ref.orderByChild('order');
      }) ;
  }

  getAllNotes() {
     return this.getData(this.itemsRef) ;
  }

  addItem(newNote: string) {
    this.itemsRef.push({ title: newNote, createTimeStamp: new Date().getTime(), order: -(new Date().getTime()), completed: false});
    this.updateLastEdited();
  }
    updateData(aNote, updateObj) {
    this.itemsRef.update(aNote.key, updateObj) ;
    this.updateLastEdited();
  }

  deleteData(aNote) {
    this.itemsRef.remove(aNote.key) ;
    this.updateLastEdited();
  }

  getLastEdited() {
    return this.db.object('/users/' + this.userId + '/lastEdited/').valueChanges();
  }

  private updateLastEdited() {
    this.db.list('/users/' + this.userId).update('/' , {lastEdited: new Date().getTime()});
  }

 private getData(list: AngularFireList<any>) {
   return list.snapshotChanges().map(data => {
      return data.map( d => {
           return ({ key: d.key  , ...d.payload.val() });
       });
    });
  }




}
