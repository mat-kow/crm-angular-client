import { Component, OnInit } from '@angular/core';
import {Status} from "../Status";
import {StatusService} from "../service/status.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status?: Status;

  constructor(
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getStatus(id)
  }

  getStatus(id: number) {
    this.statusService.getStatus(id).subscribe(status => this.status = status);
  }

  update() {
    if (this.status) {
      this.statusService.update(this.status).subscribe(_ => this.router.navigate(['/admin']));
    }
  }
  setActive(active: boolean) {
    if (this.status) {
      this.status.active = active;
    }
  }

}
