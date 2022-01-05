import { Component, OnInit } from '@angular/core';
import {Priority} from "../Priority";
import {Status} from "../Status";
import {StatusService} from "../service/status.service";
import {PriorityService} from "../service/priority.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  priorities: Priority[] = [];
  statuses: Status[] = [];

  constructor(
    private statusService: StatusService,
    private priorityService: PriorityService
  ) { }

  ngOnInit(): void {
    this.getStatuses();
    this.getPriorities();
  }

  getStatuses() {
    this.statusService.getAll().subscribe(statuses => this.statuses = statuses);
  }

  getPriorities() {
    this.priorityService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }
}
