import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "./app-config";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Priority} from "../Priority";
import {PriorityForm} from "../priority-form";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private priorityUrl = this.variables.hostUrl + "/api/priorities"

  constructor(
    private http: HttpClient,
    private variables: AppConfig,
    private auth: AuthService
  ) { }

  getPrioritiesNames(): Observable<string[]> {
    return this.http.get<string[]>(this.priorityUrl + '/names', this.auth.getAuthHeader())
  }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.priorityUrl, this.auth.getAuthHeader())
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.priorityUrl + '/all', this.auth.getAuthHeader())
  }

  createPriority(priorityForm: PriorityForm): Observable<Priority> {
    return this.http.post<Priority>(this.priorityUrl, priorityForm, this.auth.getAuthHeader());
  }

  getPriority(id: number): Observable<Priority> {
    return this.http.get<Priority>(`${this.priorityUrl}/${id}`, this.auth.getAuthHeader());
  }

  update(priority: Priority): Observable<Priority> {
    return this.http.put<Priority>(`${this.priorityUrl}/${priority.id}`, priority, this.auth.getAuthHeader());
  }
}
