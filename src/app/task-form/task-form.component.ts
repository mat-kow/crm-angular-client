import { Component, OnInit } from '@angular/core';
import {TaskForm} from "../TaskForm";
import {PriorityService} from "../service/priority.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../service/project.service";
import {TaskService} from "../service/task.service";
import {Project} from "../Project";
import {Location} from "@angular/common";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // @ts-ignore
  model = new TaskForm("", -1, "", "", -1);
  // @ts-ignore
  project: Project;
  priorities?: string[];

  topicFlag?: boolean;
  descriptionFlag?: boolean;

  constructor(
    private route: ActivatedRoute,
    private priorityService: PriorityService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPriorities();
    this.getProject()
  }

  createNewTask(priorityName: string, userId: string) {
    this.model.priorityName = priorityName;
    this.model.userId = Number(userId);
    this.taskService.createTask(this.model).subscribe({
      next: _ => {
        this.router.navigate([`/project/${this.model.projectId}`])
      },
      error: err => {
        this.resetFlags();
        if (err.status == 400) {
          let messages = String(err.error.message).split(',');
          messages.forEach(mess => {
            let pair = mess.trim().split(':');
            if (pair[0].trim() == 'topic') {
              this.topicFlag = true;
            } else if (pair[0].trim() == 'description') {
              this.descriptionFlag = true;
            }
          });
        }
      }
    });
  }

  getProject() {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.model.projectId = projectId;
    this.projectService.getProject(projectId).subscribe(project => {
      this.project = project;
    });
  }

  getPriorities() {
    this.priorityService.getPrioritiesNames().subscribe(priorities => this.priorities = priorities);
  }

  goBack(): void {
    this.location.back()
  }

  resetFlags() {
    this.topicFlag = false;
    this.descriptionFlag = false;
  }
}
