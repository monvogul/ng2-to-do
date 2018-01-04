import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
  keyframes,
  animateChild
} from '@angular/animations';
import * as firebase from 'firebase';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({
          transform: 'translate3d(0,-100px,0)',
          opacity: 0
        }),
        animate(
          '.2s',
          style({
            transform: 'translate3d(0,0,0)',
            backgroundColor: 'rgba(255, 215, 64, .1)',
            opacity: 1
          })
        )
      ])
    ]),

    trigger('listAnimation', [
      transition('* => *', [
        query('@slideIn', [stagger(50, [animateChild()])], { optional: true })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {
  items: Observable<any[]>;
  newNote: string;
  remaingingTodos: any[];
  notesQuery = 'all';
  lastEdited ;
  constructor(
    private db: AngularFireDatabase,
    private noteService: NotesService
  ) {}

  ngOnInit() {
    this.items = this.noteService.getAllNotes();
    this.lastEdited = this.noteService.getLastEdited() ;
    this.lastEdited.subscribe(val => console.log(val)) ;

    this.setIncompleteNotes();
  }

  addNewNote() {
    if (!this.newNote) {
      return;
    }
    this.noteService.addItem(this.newNote);
    this.newNote = '';
  }

  deleteNote(note) {
    this.noteService.deleteData(note);
  }
  toggleCompleted(note) {
    this.noteService.updateData(note, { completed: !note.completed });
    this.setIncompleteNotes();
  }

  // TODO: come back to this and see if there is a better way rather than subscribing all the time

  private setIncompleteNotes() {
    this.items.subscribe(note => {
      console.log(note);
        this.remaingingTodos = note.filter(aNote => !aNote.completed);
    });
  }
}
