import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { NotesService } from './notes.service';
import { notesLoadAnimation } from '../app-animations' ;

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [ notesLoadAnimation]
})

export class NotesListComponent implements OnInit {
  items: Observable<any[]>;
  newNote: string;
  notesQuery = 'all';
  lastEdited: Observable<{}>;
  incompleteTasks;

  constructor(
    private db: AngularFireDatabase,
    private noteService: NotesService
  ) {}

  ngOnInit() {
    this.items = this.noteService.getAllNotes();
    this.lastEdited = this.noteService.getLastEdited() ;
    this.incompleteTasks = this.items.map(note => {
        return note.filter(aNote => !aNote.completed);
      });
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
  }
}
