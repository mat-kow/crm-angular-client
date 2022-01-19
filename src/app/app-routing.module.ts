import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterComponent} from "./register/register.component";
import {ProjectFormComponent} from "./project-form/project-form.component";
import {ProjectComponent} from "./project/project.component";
import {TaskFormComponent} from "./task-form/task-form.component";
import {TaskComponent} from "./task/task.component";
import {AdminComponent} from "./admin/admin.component";
import {StatusFormComponent} from "./status-form/status-form.component";
import {PriorityFormComponent} from "./priority-form/priority-form.component";
import {StatusComponent} from "./status/status.component";
import {PriorityComponent} from "./priority/priority.component";
import {UserPersonalComponent} from "./user-personal/user-personal.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'index'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'index', component: HomePageComponent},
  {path: 'project/new', component: ProjectFormComponent},
  {path: 'status/new', component: StatusFormComponent},
  {path: 'status/:id', component: StatusComponent},
  {path: 'priority/new', component: PriorityFormComponent},
  {path: 'priority/:id', component: PriorityComponent},
  {path: 'project/:id', component: ProjectComponent},
  {path: 'project/:id/task', component: TaskFormComponent},
  {path: 'project/:projectId/task/:taskId', component: TaskComponent},
  {path: 'user', component: UserPersonalComponent},
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
