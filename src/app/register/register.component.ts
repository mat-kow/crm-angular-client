import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new User("", "", "", "")
  submitted = false;
  registerError = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
  }

  newProject(): void {
    this.userService.createNewUser(this.model).subscribe(isRegSuccess => {
      this.submitted = isRegSuccess;
      this.registerError = !isRegSuccess;
      this.model.password = '';
    });
  }

}
