package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.Director;
import epul.roblu.polymovie.services.CategoryService;
import epul.roblu.polymovie.services.DirectorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DirectorController {
    private final DirectorService directorService;
    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping("/public/directors")
    public List<Director> getAll() {
        return directorService.getAll();
    }

    @GetMapping("/public/directors/{code}")
    public Director getOne(@PathVariable int id) {
        return directorService.get(id);
    }
}
