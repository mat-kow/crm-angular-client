import {Project} from "./Project";
import {Status} from "./Status";
import {Priority} from "./Priority";
import {User} from "./user";

export class Task {
  id: number;
  created: Date;
  topic: string;
  project: Project;
  description: string;
  status: Status;
  priority: Priority;
  user: User

  constructor(id: number, created: Date, topic: string, project: Project,
              description: string, status: Status, priority: Priority, user: User) {
    this.id = id;
    this.created = created;
    this.topic = topic;
    this.project = project;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.user = user;
  }
}
