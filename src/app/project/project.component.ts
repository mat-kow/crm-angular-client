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

  showFilter = false;
  prioritiesInUse: Set<string> = new Set<string>();
  statusesInUse: Set<string> = new Set<string>();
  filteredTasks: Task[] = [];

  nameFlag?: boolean;
  descriptionFlag?: boolean;
  siteFlag?: boolean;

  editView = false;

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
    if (this.project && this.checkEditPermission()) {
      this.projectService.updateProject(this.project).subscribe({
        next: _ => {
          this.resetFlags();
          this.editView = false;
        },
        error: err => {
          this.resetFlags();
          if (err.status == 400) {
            let messages = String(err.error.message).split(',');
            messages.forEach(mess => {
              let pair = mess.trim().split(':');
              if (pair[0].trim() == 'name') {
                this.nameFlag = true;
              } else if (pair[0].trim() == 'description') {
                this.descriptionFlag = true;
              } else if (pair[0].trim() == 'site') {
                this.siteFlag = true;
              }
            });
          }
        }
      });
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
    this.taskService.getTaskListByProject(projectId).subscribe(tasks => {
      this.tasks = tasks;
      this.getPrioritiesAndStatuses();
      this.resetFilter();
    })
  }

  getPrioritiesAndStatuses() {
    this.tasks.forEach(task => {
      this.statusesInUse.add(task.status.name);
      this.prioritiesInUse.add(task.priority.name);
    })
  }

  setViewFilter(showFilter: boolean) {
    this.showFilter = showFilter;
  }

  filter(statusName: string, priorityName: string, username: string, fromDate: string, toDate: string) {
    this.filteredTasks = [];
    let i = 0;
    for (; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (statusName && statusName != task.status.name) {
        continue
      }
      if (priorityName && priorityName != task.priority.name) {
        continue
      }
      if (username && username != task.user.username) {
        continue
      }
      if (fromDate) {
        let from = new Date(fromDate)
        if (new Date(task.createdAt) < from) {
          continue
        }
      }
      if (toDate) {
        let to = new Date(toDate + 'T23:59:59.999+01:00')
        if (new Date(task.createdAt) > to) {
          continue
        }
      }
      this.filteredTasks.push(task);
    }
  }

  resetFilter() {
    this.filteredTasks = [];
    this.tasks.forEach(task => this.filteredTasks.push(task));
  }

  resetFlags() {
    this.nameFlag = false;
    this.descriptionFlag = false;
    this.siteFlag = false;
  }

  setEditView(view: boolean) {
    if (!this.checkEditPermission()) {
      this.editView = false;
    } else {
      this.editView = view;
    }
  }

  deleteProject() {
    if (this.checkEditPermission() && this.project) {
      this.projectService.delete(this.project.id).subscribe(_ => this.router.navigate(['/index']))
    }
  }

  checkEditPermission(): boolean {
    //todo implementation
    return true;
  }
}
