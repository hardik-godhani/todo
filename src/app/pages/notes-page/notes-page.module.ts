import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesPageRoutingModule } from './notes-page-routing.module';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule } from '@angular/material/icon';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [NotesPageComponent, NoteComponent],
  imports: [
    CommonModule,
    NotesPageRoutingModule,
    AngularEditorModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class NotesPageModule {}
