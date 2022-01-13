import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "./app-config";
import {AuthService} from "./auth.service";
import {UserRegForm} from "../user-reg-form";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = this.variables.hostUrl + '/api/users';

  constructor(
    private http: HttpClient,
    private variables: AppConfig,
    private auth: AuthService,
  ) {}

  createNewUser(user: UserRegForm): Observable<boolean> {
    return this.http.post<boolean>(this.usersUrl, user);
  }

  searchUser(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `/search?q=${query}`, this.auth.getAuthHeader());
  }

  makeAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/admins`, user.username, this.auth.getAuthHeader());
  }

  removeAdmin(user: User): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/admins/${user.username}`,  this.auth.getAuthHeader());
  }

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/admins`, this.auth.getAuthHeader())
  }
}
