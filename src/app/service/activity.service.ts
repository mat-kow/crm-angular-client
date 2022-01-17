import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Activity} from "../activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

   private activitiesUrl = environment.apiUrl + '/api/activities'

  constructor(
    private http: HttpClient,
  ) { }

  getLatest(): Observable<Activity[]> {
     return this.http.get<Activity[]>(this.activitiesUrl);
  }
}
