import { Component, OnInit } from '@angular/core';
import {PriorityService} from "../service/priority.service";
import {Location} from "@angular/common";
import {PriorityForm} from "../priority-form";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-priority-form',
  templateUrl: './priority-form.component.html',
  styleUrls: ['./priority-form.component.css']
})
export class PriorityFormComponent implements OnInit {

  nameFlag?: boolean;
  model: PriorityForm = new PriorityForm("", 0);

  constructor(
    private priorityService: PriorityService,
    private location: Location,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/index'])
      return
    }
  }

  createPriority() {
    this.priorityService.createPriority(this.model).subscribe({
      next: _ =>
        this.goBack(),
      error: err => {
        this.nameFlag = false;
        if (err.status == 400) {
          let messages = String(err.error.message).split(',');
          messages.forEach(mess => {
            let pair = mess.trim().split(':');
            if (pair[0].trim() == 'name') {
              this.nameFlag = true;
            }
          });
        }
      }
    });
  }


  goBack(): void {
    this.location.back()
  }

}
