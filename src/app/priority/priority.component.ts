import { Component, OnInit } from '@angular/core';
import {PriorityService} from "../service/priority.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Priority} from "../Priority";

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

  priority?: Priority;

  constructor(
    private priorityService: PriorityService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getPriority(id);
  }

  getPriority(id: number) {
    this.priorityService.getPriority(id).subscribe(status => this.priority = status);
  }

  update() {
    if (this.priority) {
      this.priorityService.update(this.priority).subscribe(_ => this.router.navigate(['/admin']));
    }
  }
  setActive(active: boolean) {
    if (this.priority) {
      this.priority.active = active;
    }
  }

}
