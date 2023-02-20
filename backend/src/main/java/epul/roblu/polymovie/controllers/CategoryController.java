package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.services.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public List<CategoryDTO> getAll() {
        return categoryService.getAll();
    }

    @GetMapping("/public/categories/{code}")
    public Category getOne(@PathVariable String code) {
        return categoryService.get(code);
    }
}
