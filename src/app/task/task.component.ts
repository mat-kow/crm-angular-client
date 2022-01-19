import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../service/task.service";
import {Task} from "../Task";
import {Status} from "../Status";
import {PriorityService} from "../service/priority.service";
import {StatusService} from "../service/status.service";
import {Priority} from "../Priority";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task?: Task;
  statusList: Status[] = [];
  priorityList: Priority[] = [];

  topicFlag?: boolean;
  descriptionFlag?: boolean;

  editView = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private statusService: StatusService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('taskId'));
    this.getTask(taskId);
    this.getStatuses();
    this.getPriorities()
  }

  getTask(taskId: number) {
    this.taskService.getTask(taskId).subscribe(task => this.task = task);
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe(statuses => this.statusList = statuses);
  }

  getPriorities() {
    this.priorityService.getPriorities().subscribe(priorities => this.priorityList = priorities);
  }

  saveTask() {
    // @ts-ignore
    this.taskService.updateTask(this.task).subscribe({
      next: task => {
        this.router.navigate([`/project/${task.project.id}`])
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

  resetFlags() {
    this.topicFlag = false;
    this.descriptionFlag = false;
  }

  deleteTask() {
    if (this.task && this.checkEditPermission()) {
      let projectId = this.task.project.id;
      this.taskService.deleteTask(this.task.id).subscribe(_ => this.router.navigate([`/project/${projectId}`]))
    }
  }

  setEditView(view: boolean) {
    if (!this.checkEditPermission()) {
      this.editView = false;
    } else {
      this.editView = view;
    }
  }

  checkEditPermission(): boolean {
    //todo implementation
    return true;
  }


}
