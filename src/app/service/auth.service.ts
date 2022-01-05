import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {VariablesService} from "./variables.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authenticated = false ;
  private _username = '';
  private password = '';

  constructor(
    private http: HttpClient,
    private variables: VariablesService,
    private cookieService: CookieService
  ) {
  }

  setCredentials(username: string, password: string): void {
    this._username = username;
    this.password = password;
    this.cookieService.set('username', username)
    this.cookieService.set('password', password)
  }

  logout(): void {
    // this.authenticated = false;
    // this.setCredentials('', '')
    this.cookieService.set('username', '')//todo JWT authentication
    this.cookieService.set('password', '')

  }

  authenticate(): Observable<boolean> {
    const loginUrl = this.variables.hostUrl + '/api/login';
    return this.http.get<boolean>(loginUrl, this.getAuthHeader());
  }

  getAuthHeader() {
    let headerDict = {
      'authorization': 'Basic ' + btoa(`${this.cookieService.get('username')}:${this.cookieService.get('password')}`),
    }
    return {
      headers: new HttpHeaders(headerDict),
    };
  }

}
