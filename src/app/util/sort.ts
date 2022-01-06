export class Sort {

  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  })

  constructor() { }

  public startSort(property: any, order: any, type = "") {
    if (order === "desc") {
      this.sortOrder = -1;
    }
    return (a: any, b: any) => {
      if (type === "date") {
        return this.sortData(new Date(a[property]), new Date(b[property]));
      } else if (type === "user") {
        return this.sortData(a.user.username, b.user.username);
      } else if (type === "status") {
        return this.sortData(a.status.sortingValue, b.status.sortingValue);
      } else if (type === "priority") {
        return this.sortData(a.priority.sortValue, b.priority.sortValue);
      } else {
        return this.collator.compare(a[property], b[property]) * this.sortOrder;
      }
    }
  }

  private sortData(a: any, b: any) {
    if (a < b) {
      return -1 * this.sortOrder;
    } else if (a > b) {
      return 1 * this.sortOrder;
    } else {
      return 0 * this.sortOrder;
    }
  }
}
