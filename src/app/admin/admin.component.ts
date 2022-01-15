import { Component, OnInit } from '@angular/core';
import {Priority} from "../Priority";
import {Status} from "../Status";
import {StatusService} from "../service/status.service";
import {PriorityService} from "../service/priority.service";
import {User} from "../user";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  priorities: Priority[] = [];
  statuses: Status[] = [];
  admins: User[] = [];
  viewUserSearch = false;

  constructor(
    private statusService: StatusService,
    private priorityService: PriorityService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/index'])
      return
    }
    this.getStatuses();
    this.getPriorities();
    this.getAdmins();
  }

  getStatuses() {
    this.statusService.getAll().subscribe(statuses => this.statuses = statuses);
  }

  getPriorities() {
    this.priorityService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  getAdmins() {
    this.userService.getAdmins().subscribe(admins => this.admins = admins);
  }

  setViewSearch(viewUserSearch: boolean) {
    this.viewUserSearch = viewUserSearch;
  }

  createAdmin(user: User) {
    if (!this.admins.includes(user)) {
      this.userService.makeAdmin(user).subscribe(user => this.admins.push(user))
    }
  }

  removeAdmin(user: User) {
      this.userService.removeAdmin(user).subscribe(_ => {
        const index = this.admins.indexOf(user, 0)
        this.admins.splice(index, 1);
      })
  }

}
