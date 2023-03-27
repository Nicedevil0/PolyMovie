package epul.roblu.polymovie.services;

import epul.roblu.polymovie.dto.CategoryDTO;
import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.Director;
import epul.roblu.polymovie.repositories.CategoryRepository;
import epul.roblu.polymovie.repositories.DirectorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class DirectorService {
    private final DirectorRepository directorRepository;

    public DirectorService(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    public List<Director> getAll() {
        return directorRepository.findAll();
    }

    public Director get(int id) {
        return directorRepository.findById(id).get();
    }
}
