import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "./app-config";
import {AuthService} from "./auth.service";
import {UserRegForm} from "../user-reg-form";
import {environment} from "../../environments/environment";
import {ChangePasswordForm} from "../change-password-form";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = environment.apiUrl + '/api/users';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  createNewUser(user: UserRegForm): Observable<any> {
    return this.http.post<any>(this.usersUrl, user);
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

  getUserByUsername(username: string): Observable<User>{
    return this.http.get<User>(`${this.usersUrl}/user/${username}`)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user, this.auth.getAuthHeader());
  }

  changePassword(form: ChangePasswordForm): Observable<any> {
    return this.http.put(`${this.usersUrl}/password`, form, this.auth.getAuthHeader())
  }
}
