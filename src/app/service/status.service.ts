import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "./app-config";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Status} from "../Status";
import {StatusForm} from "../StatusForm";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusUrl = this.variables.hostUrl + '/api/statuses'

  constructor(
    private http: HttpClient,
    private variables: AppConfig,
    private auth: AuthService
  ) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl, this.auth.getAuthHeader());
  }

  createStatus(statusForm: StatusForm): Observable<Status> {
    return this.http.post<Status>(this.statusUrl, statusForm, this.auth.getAuthHeader());
  }

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl + '/all', this.auth.getAuthHeader());
  }

  getStatus(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.statusUrl}/${id}`, this.auth.getAuthHeader());
  }

  update(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.statusUrl}/${status.id}`, status,this.auth.getAuthHeader())
  }
}
