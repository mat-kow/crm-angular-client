import { Component, OnInit } from '@angular/core';
import {Project} from "../Project";
import {ProjectService} from "../service/project.service";
import {Activity} from "../activity";
import {ActivityService} from "../service/activity.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  message = "Witaj"
  projects: Project[] = [];
  activities: Activity[] = [];

  constructor(
    private projectService: ProjectService,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
    this.getActivities();
  }

  getProjects(): void {
    this.projectService.getAll().subscribe(projects => this.projects = projects);
  }

  getActivities() {
    this.activityService.getLatest().subscribe(activities => this.activities = activities)
  }

}
