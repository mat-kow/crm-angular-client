import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../service/project.service";
import {ProjectForm} from "../ProjectForm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  model = new ProjectForm("", "", "")
  submitted = false;

  nameFlag?: boolean;
  descriptionFlag?: boolean;
  siteFlag?: boolean;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  newProject(): void {
    this.projectService.createNewProject(this.model).subscribe({
      next: project => {
        this.submitted = true;
        this.router.navigate([`/project/${project.id}`])
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

  resetFlags() {
    this.nameFlag = false;
    this.descriptionFlag = false;
    this.siteFlag = false;
  }
}
