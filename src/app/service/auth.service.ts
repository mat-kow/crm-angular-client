import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "./app-config";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import {Moment} from "moment";

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
    console.log('set session')
    console.log(token)
    localStorage.setItem('token', token);
    // @ts-ignore
    let decoded = jwtDecode(token);
    // @ts-ignore
    let principal = decoded.sub
    localStorage.setItem('principal', principal);
    // @ts-ignore
    let exp = decoded.exp;
    localStorage.setItem('exp', String(exp));
  }

  isLogged(): boolean {
    return moment().isBefore(this.getExpiration())
  }

  getExpiration(): Moment {
    return moment(Number(localStorage.getItem('exp')) * 1000)
  }

  getPrincipal(): string {
    //@ts-ignore
    return localStorage.getItem('principal')
  }

  isAdmin(): boolean {
    // @ts-ignore
    let authorities: Object[] = jwtDecode(localStorage.getItem('token')).authorities;
    let i = 0;
    for (; i < authorities.length; i++) {
      // @ts-ignore
      let auth = authorities[i].authority;
      if (auth === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
    // return authorities.includes('ROLE_ADMIN')
  }

  checkLocalStorage() {
    let len = localStorage.length
    let i: number;
    for (i = 0; i < len; i++) {
      let key = localStorage.key(i);
      // @ts-ignore
      console.log(key + " : " + localStorage.getItem(key))
    }
    console.log('storage end')

  }

}
