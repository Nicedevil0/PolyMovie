package epul.roblu.polymovie.services;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> getAll() {
        List<Category> categories = categoryRepository.findAll();
        Stream<CategoryDTO> dtos = categories.stream().map(category -> new CategoryDTO(category.getCode(), category.getLabel(), category.getImage(), category.getMovies().size()));
        return dtos.toList();
    }

    public Category get(String code) {
        return categoryRepository.findById(code).get();
    }
}
