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

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  newProject(): void {
    this.projectService.createNewProject(this.model).subscribe(project => {
      this.submitted = true;
      this.router.navigate([`/project/${project.id}`])
    });
  }
}
