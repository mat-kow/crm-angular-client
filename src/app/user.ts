export class User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  id: number;


  constructor(username: string, password: string, firstname: string, lastname: string, id: number) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.id = id;
  }
}
