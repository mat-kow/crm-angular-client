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
    this.taskService.updateTask(this.task).subscribe(task => this.router.navigate([`/project/${task.project.id}`]));
  }

}
