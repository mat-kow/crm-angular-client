import { Component, OnInit } from '@angular/core';
import {StatusForm} from "../StatusForm";
import {StatusService} from "../service/status.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  constructor(
    private statusService: StatusService,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  createStatus(name: string, sortValue: string) {
    if (name && sortValue) { //todo message
      let statusForm = new StatusForm(name, Number(sortValue));
      this.statusService.createStatus(statusForm).subscribe(_ => this.goBack());
    }
  }

  goBack(): void {
    this.location.back()
  }

}
