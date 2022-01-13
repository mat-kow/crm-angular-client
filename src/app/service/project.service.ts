import { Injectable } from '@angular/core';
import {ProjectForm} from "../ProjectForm";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "./app-config";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Project} from "../Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectUrl = this.variables.hostUrl + '/api/projects';

  constructor(
    private http: HttpClient,
    private variables: AppConfig,
    private auth: AuthService
  ) { }

  createNewProject(project: ProjectForm): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project, this.auth.getAuthHeader());
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(this.projectUrl + `/${projectId}`, this.auth.getAuthHeader())
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectUrl + `/${project.id}`, project, this.auth.getAuthHeader())
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl, this.auth.getAuthHeader());
  }

}
