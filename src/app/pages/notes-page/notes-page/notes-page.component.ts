import { Component, ViewChild } from '@angular/core';
import { debounce } from 'lodash';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent {
  notes: Note[] = [];
  pageNumber = 1;
  query = '';
  isScrolling = true;
  @ViewChild('input') input;

  constructor(public noteService: NoteService) {
    this.getListOfNotes();
  }

  debouncedSearch = debounce((event) => this.search(event.target.value),400)

  search(query: string) {
    this.query = query;
    this.refreshList();
  }

  scrollNotesList() {
    if (this.isScrolling) {
      this.pageNumber = this.pageNumber + 1;
      this.getListOfNotes();
    }
  }

  refreshList() {
    this.pageNumber = 1;
    this.notes = [];
    this.isScrolling = true;
    this.getListOfNotes();
  }

  getListOfNotes() {
    let model = {
      isCountOnly: false,
      options: {
        sort: { id: -1 },
        page: this.pageNumber,
        paginate: 6,
      },
    };
    if (this.query) {
      model['query'] = {
        title: this.query
      };
    }
    this.noteService.listNotes(model).subscribe((resp: any) => {
      if (resp && resp.status == 'SUCCESS' && resp.data && resp.data.data) {
        if (resp.data.data.length < 6) {
          this.isScrolling = false;
          if (resp.data.data.length > 0) {
            this.notes = [...this.notes, ...resp.data.data];
          }
        } else if ((resp.data.data.length = 6)) {
          this.isScrolling = true;
          this.notes = [...this.notes, ...resp.data.data];
        }
      }
    });
  }

  addNotes(id = '') {
    let newGroup = new Note();
    this.notes.unshift(newGroup);
  }
}
