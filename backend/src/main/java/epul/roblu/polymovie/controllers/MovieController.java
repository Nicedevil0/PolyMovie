package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.services.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/public/movies")
    public List<Movie> get() {
        return movieService.getAll();
    }

    @GetMapping("/public/movies/category/{categoryId}")
    public List<Movie> get(@PathVariable String categoryId) {
        return movieService.getByCategory(categoryId);
    }

    @GetMapping("/public/movies/{id}")
    public Movie getOne(@PathVariable int id) {
        return movieService.get(id);
    }

    @PostMapping("/movies")
    public ResponseEntity<Movie> post(Authentication authentication, @RequestBody Movie movie) {
        if(authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin"))){
            return ResponseEntity.ok(movieService.save(movie));
        }else{
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Movie> put(Authentication authentication, @PathVariable int id, @RequestBody Movie movie) {
        if(authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin"))){
            return ResponseEntity.ok(movieService.update(id, movie));
        }else{
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable int id) {
        if(authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin"))){
            movieService.delete(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(401).build();
        }
    }
}
