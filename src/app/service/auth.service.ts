import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false ;
  private username = '';
  private password = '';

  constructor(
    private http: HttpClient
  ) {
  }

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  logout(): void {
    this.authenticated = false;
    this.setCredentials('', '')
  }

  authenticate(): Observable<boolean> {
    const loginUrl = 'http://localhost:8080/api/login';
    return this.http.get<boolean>(loginUrl, this.getAuthHeader());
  }

  getAuthHeader() {
    let headerDict = {
      'authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
    }
    return {
      headers: new HttpHeaders(headerDict),
    };
  }

}
