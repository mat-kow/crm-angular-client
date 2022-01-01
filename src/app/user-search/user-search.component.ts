import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../user";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  result: User[] = [];
  query = '';
  sent = false;
  @Output() newUserEvent = new EventEmitter<User>();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  sendQuery() {
    this.userService.searchUser(this.query).subscribe(result => {
      this.result = result;
      this.sent = true;
    });
  }

  addNewUser(user: User) {
    this.newUserEvent.emit(user);
  }
}
