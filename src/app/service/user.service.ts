import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VariablesService} from "./variables.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = this.variables.hostUrl + '/api/users';

  constructor(
    private http: HttpClient,
    private variables: VariablesService
  ) {}

  createNewUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.usersUrl, user);
  }
}
