import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VariablesService} from "./variables.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = this.variables.hostUrl + '/api/users';

  constructor(
    private http: HttpClient,
    private variables: VariablesService,
    private auth: AuthService,
  ) {}

  createNewUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.usersUrl, user);
  }

  searchUser(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `/search?q=${query}`, this.auth.getAuthHeader());
  }
}
