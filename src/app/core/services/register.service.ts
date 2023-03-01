import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  requestedUrl = 'api/v1/user';

  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;

  constructor(private http: HttpClient, private route: Router) {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
    let data: any = localStorage.getItem(environment.dataKey);
    if (data) {
      data = JSON.parse(atob(data));
      this.currentToken = data;
    }
    return this.currentToken;
  }

  createUser(model) {
    return this.http.post(`${environment.baseUrl}/api/v1/user/create`, model);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
