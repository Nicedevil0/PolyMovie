import { Category } from './../../models/category.model';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = []

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
}
