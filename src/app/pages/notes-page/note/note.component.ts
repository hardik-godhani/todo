import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/note.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Output() refresh: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter your notes here...',
    translate: 'no',
    width: '100%',
    toolbarPosition: 'bottom',
    outline: false,
    showToolbar: true,
    uploadWithCredentials: false, // if needed
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    public noteService: NoteService,
    public toasterService: ToastService
  ) {}

  ngOnInit(): void {
    this.creteForm();
  }

  creteForm() {
    this.form = this.fb.group({
      id: [this.note.id, [Validators.required]],
      title: [this.note.title, [Validators.required]],
      description: [this.note.description, [Validators.required]],
    });
  }

  removeNote() {
    this.noteService.deleteNote(this.note.id).subscribe((resp: any) => {
      if (resp && resp.status == 'SUCCESS') {
        this.refresh.emit(true);
        this.toasterService.successMsg('Deleted', resp.message);
      } else {
        this.toasterService.errorMsg(resp.message);
      }
    });
  }

  saveNote() {
    if (this.note.id) {
      this.noteService.updateNote(this.form.value).subscribe((resp: any) => {
        if (resp && resp.status == 'SUCCESS' && resp.data) {
          this.note = resp.data[0];
          this.toasterService.savedataMsg(resp.message);
        } else {
          this.toasterService.errorMsg(resp.message);
        }
      });
    } else {
      this.noteService.createNote(this.form.value).subscribe((resp: any) => {
        if (resp && resp.status == 'SUCCESS' && resp.data) {
          this.refresh.emit(true);
          this.toasterService.savedataMsg(resp.message);
        } else {
          this.toasterService.errorMsg(resp.message);
        }
      });
    }
  }
}
