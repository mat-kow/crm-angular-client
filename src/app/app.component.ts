import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isLogged?: boolean;
  isAdmin?: boolean;
  navigationSubscription;
  principal?: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.checkLogged();
    this.checkAdmin();
    this.getPrincipal();
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.checkLogged();
    this.checkAdmin();
    this.getPrincipal()
  }

  checkLogged() {
    this.isLogged = this.auth.isLogged();
  }

  checkAdmin() {
    if(this.isLogged) {
      this.isAdmin = this.auth.isAdmin();
    }
  }

  getPrincipal() {
    this.principal = this.auth.getPrincipal();
  }

  logout() {
    this.auth.logoutJwt();
    this.initialiseInvites()
    this.router.navigate(['/'])
  }
}
