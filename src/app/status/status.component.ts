import { Component, OnInit } from '@angular/core';
import {Status} from "../Status";
import {StatusService} from "../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status?: Status;

  nameFlag = false;

  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/index'])
      return
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getStatus(id)
  }

  getStatus(id: number) {
    this.statusService.getStatus(id).subscribe(status => this.status = status);
  }

  update() {
    if (this.status) {
      this.statusService.update(this.status).subscribe({
        next: _ =>
          this.router.navigate(['/admin']),
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
  }

  setActive(active: boolean) {
    if (this.status) {
      this.status.active = active;
    }
  }

}
