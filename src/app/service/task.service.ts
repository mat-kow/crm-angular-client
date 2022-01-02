import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VariablesService} from "./variables.service";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Task} from "../Task";
import {TaskForm} from "../TaskForm";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = this.variables.hostUrl + "/api/tasks"

  constructor(
    private http: HttpClient,
    private variables: VariablesService,
    private auth: AuthService
  ) {
  }

  createTask(task: TaskForm): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.auth.getAuthHeader());
  }
}
