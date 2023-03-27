import { Category } from "./category.model";
import { Director } from "./director.model";

export class Movie {
  id: number;
  title: string;
  duration: number | string;
  release: Date | string;
  budget: number;
  revenue: number;
  image: string;
  director: Director;
  category: Category;

  constructor(id: number, title: string, duration: number, release: Date, budget: number, revenue: number, image: string, director: Director, category: Category) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.release = release;
    this.budget = budget;
    this.revenue = revenue;
    this.image = image;
    this.director = director;
    this.category = category;
  }
}
