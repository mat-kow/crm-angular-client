import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "./app-config";
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
    private variables: AppConfig,
    private auth: AuthService
  ) {
  }

  createTask(task: TaskForm): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, this.auth.getAuthHeader());
  }

  getTaskListByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.taskUrl}/project/${projectId}`, this.auth.getAuthHeader())
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.taskUrl}/${taskId}`, this.auth.getAuthHeader());
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.taskUrl}/${task.id}`, task, this.auth.getAuthHeader());
  }
}
