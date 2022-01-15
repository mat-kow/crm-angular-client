import { Component, OnInit } from '@angular/core';
import {StatusForm} from "../StatusForm";
import {StatusService} from "../service/status.service";
import {Location} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  model: StatusForm = new StatusForm("", 0);

  nameFlag = false;

  constructor(
    private statusService: StatusService,
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

  createStatus() {
    this.statusService.createStatus(this.model).subscribe({
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
