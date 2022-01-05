import { Component, OnInit } from '@angular/core';
import {PriorityService} from "../service/priority.service";
import {Location} from "@angular/common";
import {PriorityForm} from "../priority-form";

@Component({
  selector: 'app-priority-form',
  templateUrl: './priority-form.component.html',
  styleUrls: ['./priority-form.component.css']
})
export class PriorityFormComponent implements OnInit {

  constructor(
    private priorityService: PriorityService,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  createStatus(name: string, sortValue: string) {
    if (name && sortValue) { //todo message
      let priorityForm = new PriorityForm(name, Number(sortValue));
      this.priorityService.createPriority(priorityForm).subscribe(_ => this.goBack());
    }
  }

  goBack(): void {
    this.location.back()
  }

}
