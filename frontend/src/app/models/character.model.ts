import { Movie } from './movie.model';
import { Actor } from "./actor.model";

export class Character {
  id: number;
  name: string;
  actor: Actor;
  movie: Movie;

  constructor(id: number, name: string, actor: Actor, movie: Movie) {
    this.id = id;
    this.name = name;
    this.actor = actor;
    this.movie = movie;
  }
}
