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
