import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {Project} from "../Project";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project?: Project;

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
}
