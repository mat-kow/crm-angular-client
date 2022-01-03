import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "./variables.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Priority} from "../Priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private priorityUrl = this.variables.hostUrl + "/api/priorities"

  constructor(
    private http: HttpClient,
    private variables: VariablesService,
    private auth: AuthService
  ) { }

  getPrioritiesNames(): Observable<string[]> {
    return this.http.get<string[]>(this.priorityUrl + '/names', this.auth.getAuthHeader())
  }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.priorityUrl, this.auth.getAuthHeader())
  }
}
