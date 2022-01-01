export class ProjectForm {
  name: string;
  description: string;
  site: string;

  constructor(name: string, description: string, site: string) {
    this.name = name;
    this.description = description;
    this.site = site;
  }
}
