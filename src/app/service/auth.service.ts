import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {VariablesService} from "./variables.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false ;
  private username = '';
  private password = '';

  constructor(
    private http: HttpClient,
    private variables: VariablesService
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
    const loginUrl = this.variables.hostUrl + '/api/login';
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
