import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "./variables.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

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

  getPriorities(): Observable<string[]> {
    return this.http.get<string[]>(this.priorityUrl, this.auth.getAuthHeader())
  }
}
