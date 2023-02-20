export class Category {
  code: string;
  label: string;
  image: string;
  nbMovies: number;

  constructor(code: string, label: string, image: string, nbMovies: number = 0) {
    this.code = code;
    this.label = label;
    this.image = image;
    this.nbMovies = nbMovies;
  }
}
