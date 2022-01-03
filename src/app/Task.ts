import {Project} from "./Project";
import {Status} from "./Status";
import {Priority} from "./Priority";
import {User} from "./user";

export class Task {

  constructor(
    public id: number,
    public createdAt: Date,
    public topic: string,
    public project: Project,
    public description: string,
    public status: Status,
    public priority: Priority,
    public user: User
  ) {}
}
