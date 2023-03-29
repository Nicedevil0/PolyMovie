package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public CategoryDTO getOne(@PathVariable String code) {
        return categoryService.get(code);
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<Category> getOne(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.save(category));
    }

    @DeleteMapping("/admin/movies/{id}")
    public ResponseEntity<Void> delete(@PathVariable String code) {
        categoryService.delete(code);
        return ResponseEntity.ok().build();
    }
}
