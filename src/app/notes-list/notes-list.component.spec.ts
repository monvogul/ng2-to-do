import { DatePipe } from '@angular/common';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MaterialComponentModule } from '../material-component.module';
import { NotesListComponent } from './notes-list.component';
import { NotesService } from './notes.service';
import { Observable } from 'rxjs/Observable';


describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;
  let allNotesDe: DebugElement[] ;
  let lastEdtDe: DebugElement;
  let incmpTsk: DebugElement;
  let service;

  const datePipe = new DatePipe('en-US') ;
  const lastEdited = 1517143075 ;

  const items = [
    {
    title : 'one',
    completed: false,
    order: -400
   },
   {
    title : 'two',
    completed: true,
    order: -300
   },
   {
    title : 'three',
    completed: false,
    order: -200
   }
  ];
  class NotesServiceStub {

     itemSub = new BehaviorSubject<any[]>(items);
     lstEditSub = new BehaviorSubject<number>(lastEdited);

    getAllNotes() {
       return  this.itemSub.asObservable();
    }

    getLastEdited() {
      return this.lstEditSub.asObservable() ;
    }
    addItem(aNote) {
     const newNote =  { title: aNote,
                        createTimeStamp: new Date().getTime(),
                        order: -100, completed: false
                      } ;
      items.push(newNote);
      this.itemSub.next(items) ;
      this.updateLastEdited();
    }
    updateData(aNote, completedObj: { completed: boolean}) {
      const indx = items.indexOf(aNote) ;
      items[indx].completed = completedObj.completed ;
      this.itemSub.next(items) ;
      this.updateLastEdited();
    }

    deleteData(aNote) {
      const indx = items.indexOf(aNote) ;
      items.splice(indx, 1) ;
      this.itemSub.next(items) ;
      this.updateLastEdited();
    }

    private updateLastEdited() {
       const lstEditDTM = new Date().getTime()  ;
       this.lstEditSub.next(lstEditDTM) ;
    }

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListComponent ],
      imports: [ MaterialComponentModule, BrowserAnimationsModule, FormsModule ],
      providers: [
         DatePipe,
        { provide: NotesService, useClass: NotesServiceStub }
       ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NotesListComponent);
    service = TestBed.get(NotesService) ;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show existing todo taks onload', () => {

    allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
    lastEdtDe = fixture.debugElement.query(By.css('span.lstEdited')) ;
    incmpTsk = fixture.debugElement.query(By.css('mat-card-footer>span')) ;

    expect(allNotesDe.length).toBe(3) ;
    expect(lastEdtDe.nativeElement.textContent).toContain(datePipe.transform(lastEdited, 'short' ) ) ;
    expect(incmpTsk.nativeElement.textContent).toContain('2') ;

  });


  it('should add a new todo item', fakeAsync ( () => {

      const newNoteDe = fixture.debugElement.query(By.css('input[type=text]'));
      const newNoteHtml = newNoteDe.nativeElement ;

      newNoteHtml.value = 'a new note' ;
      newNoteHtml.dispatchEvent(new Event('input')) ;

      tick();
      fixture.detectChanges();

      expect(component.newNote).toBe('a new note') ;

      newNoteDe.triggerEventHandler('keyup.enter', null);
      tick() ;
      fixture.detectChanges();

      allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
      incmpTsk = fixture.debugElement.query(By.css('mat-card-footer>span')) ;
      lastEdtDe = fixture.debugElement.query(By.css('span.lstEdited')) ;


      expect(component.newNote).toBe('') ;
      expect(allNotesDe.length).toBe(4) ;
      expect(incmpTsk.nativeElement.textContent).toContain('3') ;
      expect(lastEdtDe.nativeElement.textContent).toContain(datePipe.transform(new Date().getTime(), 'M/d/yy' ) ) ;
  }));

  it('should toggle item complete status on click', fakeAsync ( () => {

      allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
      incmpTsk = fixture.debugElement.query(By.css('mat-card-footer>span')) ;
      lastEdtDe = fixture.debugElement.query(By.css('span.lstEdited')) ;

      // check the first item
      const firstItem = allNotesDe[0];

      firstItem.triggerEventHandler('click', null);
      tick() ;
      fixture.detectChanges();

      expect(incmpTsk.nativeElement.textContent).toContain('2') ;
      expect(lastEdtDe.nativeElement.textContent).toContain(datePipe.transform(new Date().getTime(), 'M/d/yy' ) ) ;

     // uncheck the first item
      firstItem.triggerEventHandler('click', null);
      tick() ;
      fixture.detectChanges();

      incmpTsk = fixture.debugElement.query(By.css('mat-card-footer>span')) ;
      lastEdtDe = fixture.debugElement.query(By.css('span.lstEdited')) ;

      expect(incmpTsk.nativeElement.textContent).toContain('3') ;
      expect(lastEdtDe.nativeElement.textContent).toContain(datePipe.transform(new Date().getTime(), 'M/d/yy' ) ) ;


  }));

  it('should delete item on clicking delete icon', fakeAsync ( () => {
    const delNoteDe  = fixture.debugElement.query(By.css('mat-icon.delNote'));
    delNoteDe.triggerEventHandler('click', null);
    tick() ;
    fixture.detectChanges();

    allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
    lastEdtDe = fixture.debugElement.query(By.css('span.lstEdited')) ;

    expect(allNotesDe.length).toBe(3) ;
    expect(lastEdtDe.nativeElement.textContent).toContain(datePipe.transform(new Date().getTime(), 'M/d/yy' ) ) ;

}));

it('should show no pending items message when there are no items',() => {
  const serviceSpy = spyOn(service, 'getAllNotes').and.returnValue(Observable.of([]));
  const fix = TestBed.createComponent(NotesListComponent);

  const comp = fix.componentInstance;
  fix.detectChanges();
  const noNotesDe  = fix.debugElement.query(By.css('span.all-done'));
  expect(noNotesDe.nativeElement.textContent).toContain('No Pending Tasks');

});


it('should show tasks according to the selected filter[any,complete or incomplete]', fakeAsync ( () => {

  const filterAllDe  = fixture.debugElement.query(By.css('mat-chip[value=all]'));
  const filterCompleteDe  = fixture.debugElement.query(By.css('mat-chip[value=comp]'));
  const filterIncompDe  = fixture.debugElement.query(By.css('mat-chip[value=incomp]'));

  // Show completed tasks
  filterCompleteDe.triggerEventHandler('click', new Event('click'));
  tick() ;
  fixture.detectChanges();

  allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
  expect(allNotesDe.length).toBe(1, 'complete') ;
  expect(filterCompleteDe.classes['mat-chip-selected'] ).toBeTruthy();


  // Show incomplete tasks
  filterIncompDe.triggerEventHandler('click', new Event('click'));
  tick() ;
  fixture.detectChanges();

  allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
  expect(allNotesDe.length).toBe(2, 'incomplete') ;
  expect(filterIncompDe.classes['mat-chip-selected'] ).toBeTruthy();

  // Show all task
  filterAllDe.triggerEventHandler('click', new Event('click'));
  tick() ;
  fixture.detectChanges();

  allNotesDe  = fixture.debugElement.queryAll(By.css('mat-list-option'));
  expect(allNotesDe.length).toBe(3, 'all') ;
  expect(filterAllDe.classes['mat-chip-selected'] ).toBeTruthy();

}));


});
