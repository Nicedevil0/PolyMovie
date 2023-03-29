package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.models.Character;
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
    public List<Movie> getAll() {
        return movieService.getAll();
    }

    @GetMapping("/public/movies/category/{categoryCode}")
    public List<Movie> getByCategory(@PathVariable String categoryCode) {
        return movieService.getByCategory(categoryCode);
    }

    @GetMapping("/public/movies/actor/{id}")
    public List<Movie> getByMovie(@PathVariable int id) {
        return movieService.getByActor(id);
    }

    @GetMapping("/public/movies/{id}/characters")
    public List<Character> getCharacters(@PathVariable int id) {
        return movieService.getCharacters(id);
    }

    @GetMapping("/public/movies/{id}")
    public Movie getById(@PathVariable int id) {
        return movieService.get(id);
    }

    @GetMapping("/public/movies/prev/{id}")
    public Movie getPrev(@PathVariable int id) {
        return movieService.getPrev(id);
    }

    @GetMapping("/public/movies/next/{id}")
    public Movie getNext(@PathVariable int id) {
        return movieService.getNext(id);
    }

    @PostMapping("/admin/movies")
    public ResponseEntity<Movie> post(@RequestBody Movie movie) {
            return ResponseEntity.ok(movieService.save(movie));
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Movie> put(Authentication authentication, @PathVariable int id, @RequestBody Movie movie) {
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin"))) {
            return ResponseEntity.ok(movieService.update(id, movie));
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable int id) {
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin"))) {
            movieService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
