import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import * as firebase from "firebase";
import {queryDef} from "@angular/core/src/view";
import {AuthService} from "../auth/auth.service";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map' ;
import {AngularFireObject} from "angularfire2/database/interfaces";

@Injectable()
export class NotesService {

  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private authServ: AuthService) {
    let userId = authServ.currentUserId;
    console.log("userId " , userId);
    this.itemsRef = this.db.list('/users/'+ userId +'/notes', ref => {
            return ref.orderByChild("order");
      }) ;
  }

  getAllNotes() {
     return this.getData(this.itemsRef) ;
  }

  addItem(newNote: string) {
    this.itemsRef.push({ title: newNote, createTimeStamp: new Date().getTime(), order: -(new Date().getTime()), completed:false});
  }
  updateData(aNote, updateObj) {
    this.itemsRef.update(aNote.key, updateObj) ;
  }

  deleteData(aNote) {
    this.itemsRef.remove(aNote.key) ;
  }


 private getData(list) {
   return list.snapshotChanges().map(data => {
      return data.map( d => ({ key: d.payload.key, ...d.payload.val() }));
    });
  }




}
