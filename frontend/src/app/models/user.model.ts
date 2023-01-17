export class User {
  id: number;
  login: string;
  role: string;

  constructor(id: number, login: string, role: string) {
    this.id = id;
    this.login = login;
    this.role = role;
  }
}
