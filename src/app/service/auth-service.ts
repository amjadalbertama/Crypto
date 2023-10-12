import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { tap, catchError } from 'rxjs/operators';
import { map, Observable, of , EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: string = '';
  name_auth: string = '';
  constructor(private http: HttpClient, private router: Router) { 
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.token = user.token || '';
    this.name_auth = user.name_auth || '';
    this.isLoggedIn = !!this.token; 
  }

  login(email: string, password: string ): Observable<boolean> {
    return this.http.post<any>(environment.apiUrl + 'login', { email, password }).pipe(
        map(response => {
          if (response && response.token) {
            this.isLoggedIn = true;
            this.token = response.token;
            this.name_auth = response.data.name;
            // console.log(this.name_auth)
            localStorage.setItem('user', JSON.stringify({ token: this.token, name_auth: this.name_auth }));
            return true;
          }
          
          this.isLoggedIn = false;
          this.token = '';
          this.name_auth = '';
          return false;
        })
      );
  }

  logout(): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  
    return this.http.post<void>(environment.apiUrl + 'logout', {}, { headers }).pipe(
      tap(() => {
        this.isLoggedIn = false;
        this.token = '';
        this.name_auth = '';
        localStorage.removeItem('user');
      })
    );
  }

  getToken(): string {
    return this.token;
  }

  getName(): string {
    return this.name_auth;
  }
}
