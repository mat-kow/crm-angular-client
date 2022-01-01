import {User} from "./user";

export class Project {
  constructor(id: number, name: string, description: string, slug: string,
              site: string, users: User[], active: boolean, created: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.slug = slug;
    this.site = site;
    this.users = users;
    this.active = active;
    this.created = created;
  }
  id: number;
  name: string;
  description: string;
  slug: string;
  site: string;
  users: User[];
  active: boolean;
  created: Date;
}
