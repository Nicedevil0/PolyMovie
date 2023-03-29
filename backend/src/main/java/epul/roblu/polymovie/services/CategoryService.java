package epul.roblu.polymovie.services;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.User;
import epul.roblu.polymovie.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public CategoryDTO get(String code) {
        Optional<Category> cat = categoryRepository.findById(code);
        return cat.map(category -> new CategoryDTO(category.getCode(), category.getLabel(), category.getImage(), category.getMovies().size())).orElse(null);
    }

    public Category save(Category category){
        category.setCode(category.getLabel().toUpperCase().substring(0, 2));
        return categoryRepository.save(category);
    }

    public void delete(String code) {
        if(categoryRepository.existsById(code)){
            categoryRepository.deleteById(code);
        }
    }
}
