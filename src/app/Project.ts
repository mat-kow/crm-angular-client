import {User} from "./user";

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public slug: string,
    public site: string,
    public users: User[],
    public active: boolean,
    public createdAt: Date
  ) {}
}
