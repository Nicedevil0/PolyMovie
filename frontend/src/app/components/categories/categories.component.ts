import { Category } from './../../models/category.model';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = []
  currentUser!: User | null;

  constructor(private categoryService: CategoryService, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
}
