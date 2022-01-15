import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  badCredentialsFlag = false;

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.authService.loginJwt(username.trim(), password.trim()).subscribe(
      {
        next: data => {
          let token = data.headers.get('Authorization');
          this.authService.setSession(token);
          this.goBack();
        },
        error: err => {
          if (err.status == 403) {
            this.badCredentialsFlag = true;
          }
        }
      })
  }

  logout(): void {
    this.authService.logoutJwt();
    this.goBack();
  }

  goBack(): void {
    this.location.back()
  }

}
