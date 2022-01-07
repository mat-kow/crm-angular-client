import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "./app-config";
import jwtDecode from "jwt-decode";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: AppConfig,
  ) {
  }

  getAuthHeader() {
    let token = localStorage.getItem('token');
    let headerDict = {
      'authorization': token,
    }
    // @ts-ignore
    return { headers: new HttpHeaders(headerDict) };
  }

  loginJwt(username: string, password: string): Observable<any> {
    const loginUrl = this.config.hostUrl + '/api/login';
    return this.http.post<any>(loginUrl, `{"username": "${username}", "password": "${password}"}`, {observe: 'response'})
  }

  logoutJwt() {
    localStorage.removeItem('token');
    localStorage.removeItem('principal');
    localStorage.removeItem('exp');
  }

  setSession(token: string) {
    localStorage.setItem('token', token);
    // @ts-ignore
    let decoded = jwtDecode(token);
    // @ts-ignore
    let principal = decoded.sub
    localStorage.setItem('principal', principal);
    // @ts-ignore
    let exp = decoded.exp;
    localStorage.setItem('exp', exp);
  }

  isLogged(): boolean {
    return moment().isBefore(this.getExpiration())
  }

  getExpiration() {
    return moment(localStorage.getItem('exp'))
  }

  getPrincipal(): string {
    //@ts-ignore
    return localStorage.getItem('principal')
  }

  isAdmin(): boolean {
    // @ts-ignore
    let authorities: string[] = localStorage.getItem('token');
    return authorities.includes('ROLE_ADMIN')
  }

}
