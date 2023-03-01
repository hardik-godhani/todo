import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesPageRoutingModule } from './notes-page-routing.module';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule } from '@angular/material/icon';
import { NoteComponent } from './note/note.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [NotesPageComponent, NoteComponent],
  imports: [
    CommonModule,
    NotesPageRoutingModule,
    AngularEditorModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class NotesPageModule {}
