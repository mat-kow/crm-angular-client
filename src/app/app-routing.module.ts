import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterComponent} from "./register/register.component";
import {ProjectFormComponent} from "./project-form/project-form.component";
import {ProjectComponent} from "./project/project.component";
import {TaskFormComponent} from "./task-form/task-form.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'index'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'index', component: HomePageComponent},
  {path: 'project/new', component: ProjectFormComponent},
  {path: 'project/:id', component: ProjectComponent},
  {path: 'project/:id/task', component: TaskFormComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
