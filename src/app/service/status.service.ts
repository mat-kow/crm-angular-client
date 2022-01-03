import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "./variables.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Status} from "../Status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusUrl = this.variables.hostUrl + '/api/statuses'

  constructor(
    private http: HttpClient,
    private variables: VariablesService,
    private auth: AuthService
  ) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl, this.auth.getAuthHeader());
  }
}
