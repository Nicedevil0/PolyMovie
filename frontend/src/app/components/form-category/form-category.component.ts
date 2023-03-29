import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent {

  category: Category = new Category('', '', '', 0);

  constructor(private router: Router, private categoryService: CategoryService){
  }

  saveMovie(): void {
    this.categoryService.create(this.category).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }

}
