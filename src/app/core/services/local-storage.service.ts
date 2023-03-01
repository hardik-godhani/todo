import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(): User {
    let data = localStorage.getItem(environment.dataKey);
    return data ? JSON.parse(window.atob(data)) : null;
  }

  setUser(user: User): void {
    user && user.id
      ? localStorage.setItem(
          environment.dataKey,
          window.btoa(JSON.stringify(user))
        )
      : null;
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.clear();
  }
}
