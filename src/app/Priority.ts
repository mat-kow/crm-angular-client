export class Priority {
  id: number;
  name: string;
  active: boolean;
  sortValue: number;

  constructor(id: number, name: string, active: boolean, sortValue: number) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.sortValue = sortValue;
  }
}
