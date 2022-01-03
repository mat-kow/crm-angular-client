import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {Project} from "../Project";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import {TaskService} from "../service/task.service";
import {Task} from "../Task";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project?: Project;
  viewUserSearch = false;
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProject(projectId);
    this.getTasks(projectId)
  }

  getProject(projectId: number) {
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

  newTask(projectId: number) {
    // @ts-ignore
    this.router.navigate([`/project/${projectId}/task`])
  }

  getTasks(projectId: number) {
    this.taskService.getTaskListByProject(projectId).subscribe(tasks => this.tasks = tasks)
  }
}
