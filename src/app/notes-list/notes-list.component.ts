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
import {NotesService} from './notes.service';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'scale(0.8) translateX(-25%)' }), { optional: true }),
        query(':enter', animate('400ms'), { optional: true })

      ])
    ]) ]
})
export class NotesListComponent implements OnInit {
  items: Observable<any[]>;
  newNote: string  ;
  remaingingTodos: any[] ;
  notesQuery="all" ;

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

  //TODO: come back to this and see if there is a better way rather than subscribing all the time
  private setIncompleteNotes(){
    this.items.subscribe(note => {
      this.remaingingTodos =  note.filter(aNote => !aNote.completed) ;
    }) ;

  }


}
