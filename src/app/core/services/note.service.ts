import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {

  constructor(private http: HttpClient) { }

  createNote(model) {
    return this.http.post(`${environment.baseUrl}/api/v1/task/create`, model);
  }

  updateNote(model) {
    return this.http.put(`${environment.baseUrl}/api/v1/task/update/${model.id}`, model);
  }

  getNoteById(id) {
    return this.http.get(`${environment.baseUrl}/api/v1/task/${id}`);
  }

  listNotes(model) {
    return this.http.post(`${environment.baseUrl}/api/v1/task/list`, model);
  }

  deleteNote(id) {
    return this.http.delete(`${environment.baseUrl}/api/v1/task/delete/${id}`);
  }
}
