import { Component, OnInit } from '@angular/core';
import {PriorityService} from "../service/priority.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Priority} from "../Priority";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

  priority?: Priority;

  nameFlag = false;

  constructor(
    private priorityService: PriorityService,
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
    this.getPriority(id);
  }

  getPriority(id: number) {
    this.priorityService.getPriority(id).subscribe(status => this.priority = status);
  }

  update() {
    if (this.priority) {
      this.priorityService.update(this.priority).subscribe({
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
    if (this.priority) {
      this.priority.active = active;
    }
  }

}
