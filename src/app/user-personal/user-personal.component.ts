import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {ChangePasswordForm} from "../change-password-form";

@Component({
  selector: 'app-user-personal',
  templateUrl: './user-personal.component.html',
  styleUrls: ['./user-personal.component.css']
})
export class UserPersonalComponent implements OnInit {

  user?: User;

  editView = false;
  firstnameFlag?: boolean;
  lastnameFlag?: boolean;
  model?: User;

  changePassView = false;
  oldPassFlag = false;
  newPassFlag = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.getUser();
    } else {
      this.router.navigate(['/login'])
    }
  }

  getUser() {
    let username = this.auth.getPrincipal();
    this.userService.getUserByUsername(username).subscribe(user => this.user = user)
  }

  setEditView(view: boolean) {
    if (view) {
      this.model = Object.assign({}, this.user);
    }
    this.editView = view;
  }

  saveChanges() {
    if (this.model) {
      this.userService.updateUser(this.model).subscribe({
        next: user => {
          this.resetFlags();
          this.user = user;
          this.setEditView(false)
        },
        error: err => {
          this.resetFlags();
          if (err.status == 400) {
            let messages = String(err.error.message).split(',');
            messages.forEach(mess => {
              let pair = mess.trim().split(':');
              if (pair[0].trim() == 'lastname') {
                this.lastnameFlag = true;
              } else if (pair[0].trim() == 'firstname') {
                this.firstnameFlag = true;
              }
            })
          }
        }

      })
    }
  }

  resetFlags() {
    this.firstnameFlag = false;
    this.lastnameFlag = false;
  }

  setChangePassView(view: boolean) {
    this.changePassView = view;
  }

  changePassword(oldPass: string, newPass: string) {
    let form = new ChangePasswordForm(oldPass, newPass);
    this.userService.changePassword(form).subscribe({
      next: _ => {
        this.resetPassFlags()
        this.setChangePassView(false);
        //todo success message
      },
      error: err => {
        this.resetPassFlags();
        if (err.status == 400) {
          let messages = String(err.error.message).split(',');
          messages.forEach(mess => {
            let pair = mess.trim().split(':');
            if (pair[0].trim() == 'newPass') {
              this.newPassFlag = true;
            } else if (pair[0].trim() == 'oldPass') {
              this.oldPassFlag = true;
            }
          });
        }

      }
    })
  }

  resetPassFlags() {
    this.oldPassFlag = false;
    this.newPassFlag = false;
  }


}
