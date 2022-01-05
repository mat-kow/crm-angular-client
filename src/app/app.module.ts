import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectComponent } from './project/project.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskComponent } from './task/task.component';
import { AdminComponent } from './admin/admin.component';
import { StatusFormComponent } from './status-form/status-form.component';
import { PriorityFormComponent } from './priority-form/priority-form.component';
import { StatusComponent } from './status/status.component';
import { PriorityComponent } from './priority/priority.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ProjectFormComponent,
    ProjectComponent,
    UserSearchComponent,
    TaskFormComponent,
    TaskComponent,
    AdminComponent,
    StatusFormComponent,
    PriorityFormComponent,
    StatusComponent,
    PriorityComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
