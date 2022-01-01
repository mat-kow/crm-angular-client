import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.authService.setCredentials(username.trim(), password.trim());
    this.authService.authenticate().subscribe(isCredentialsRight => {
      if (isCredentialsRight) {
        // this.authService.authenticated = true;
        this.goBack();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.goBack();
  }

  goBack(): void {
    this.location.back()
  }

}
