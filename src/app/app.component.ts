import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {
  trigger,
  state,
  style,
  animate,
  transition, group, query, stagger, keyframes, animateChild
} from '@angular/animations';
import * as firebase from 'firebase';
import {NotesService} from './notes-list/notes.service';
import {MatSelectionList} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [

    trigger('listAnimation', [
      transition(
        "* => *",
        [
          animate(
            ".3s ease-in-out"
                    ),
          style({
            opacity: 0
           })
        ]
      ),

      ])
    ]
})
export class AppComponent implements OnInit {

  items: Observable<any[]>;
  newNote: string  ;
  remaingingTodos: any[] ;

  constructor(private db: AngularFireDatabase, private noteService: NotesService) {}

   ngOnInit() {
     this.items = this.noteService.getAllNotes() ;
     this.setIncompleteNotes();
   }

  addNewNote() {
    if(!this.newNote) { return; }
    this.noteService.addItem(this.newNote);
    this.newNote = '';
  }

  deleteNote(note){
    this.noteService.deleteData(note) ;
  }
    toggleCompleted(note) {
      this.noteService.updateData(note, {completed: !note.completed});
      this.setIncompleteNotes();
    }

      private setIncompleteNotes(){
        this.items.subscribe(note => {
          this.remaingingTodos =  note.filter(aNote => !aNote.completed) ;
        }) ;

      }

 }

