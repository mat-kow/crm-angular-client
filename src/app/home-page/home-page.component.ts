import { Component, OnInit } from '@angular/core';
import {Project} from "../Project";
import {ProjectService} from "../service/project.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  message = "Witaj"
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getAll().subscribe(projects => this.projects = projects);
  }

}
