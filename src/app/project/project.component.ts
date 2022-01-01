import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {Project} from "../Project";
import {ActivatedRoute} from "@angular/router";
import {User} from "../user";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project?: Project;
  viewUserSearch = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(projectId).subscribe(project => this.project = project);

  }

  saveChanges() {
    if (this.project) {
      this.projectService.updateProject(this.project).subscribe();
    }
  }

  setActive(active: boolean) {
    if (this.project) {
      this.project.active = active;
    }
  }

  setViewSearch(view: boolean) {
    this.viewUserSearch = view;
  }

  addUserToList(user: User) {
    // @ts-ignore
    if (!this.project.users.includes(user)) {
      this.project?.users.push(user)
    }
  }
}
