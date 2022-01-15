import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {UserRegForm} from "../user-reg-form";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new UserRegForm("", "", "", "")
  submitted = false;

  passwordFlag?: boolean;
  usernameFlag?: boolean;
  firstnameFlag?: boolean;
  lastnameFlag?: boolean;
  usernameTakenFlag?: boolean;


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.router.navigate(['index'])
    }
    this.resetFlags();
  }

  newUser(): void {
    this.userService.createNewUser(this.model).subscribe({
      next: _ => {
        this.submitted = true;
        this.model.password = '';
      },
      error: err => {
        this.resetFlags();
        if (err.status == 400) {
          this.model.password = '';
          let messages = String(err.error.message).split(',');
          messages.forEach(mess => {
            let pair = mess.trim().split(':');
            if (pair[0].trim() == 'username') {
              if (pair[1].trim() == 'taken') {
                this.usernameTakenFlag = true;
              } else {
                this.usernameFlag = true;
              }
            } else if (pair[0].trim() == 'password') {
              this.passwordFlag = true;
            } else if (pair[0].trim() == 'lastname') {
              this.lastnameFlag = true;
            } else if (pair[0].trim() == 'firstname') {
              this.firstnameFlag = true;
            }
          })
        }
      }
    });
  }

  resetFlags() {
    this.passwordFlag = false;
    this.usernameFlag = false;
    this.firstnameFlag = false;
    this.lastnameFlag = false;
    this.usernameTakenFlag = false;
  }

}
