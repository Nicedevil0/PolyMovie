import { Movie } from './movie.model';
export class User {
  id: number;
  login: string;
  role: string;
  favorites: Movie[];

  constructor(id: number, login: string, role: string, favorites: Movie[]) {
    this.id = id;
    this.login = login;
    this.role = role;
    this.favorites = favorites;
  }
}
