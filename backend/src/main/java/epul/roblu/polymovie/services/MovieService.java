package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.Character;
import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.repositories.MovieRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final ActorService actorService;

    public MovieService(MovieRepository movieRepository, ActorService actorService) {
        this.movieRepository = movieRepository;
        this.actorService = actorService;
    }

    public List<Movie> getByCategory(String categoryId) {
        return movieRepository.findByCategoryCode(categoryId);
    }

    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie get(int id) {
        if (movieRepository.existsById(id)) {
            return movieRepository.findById(id).get();
        }
        return null;
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie update(int id, Movie movie) {
        if (movieRepository.existsById(id)) {
            movie.setId(id);
            return movieRepository.save(movie);
        }
        throw new ObjectNotFoundException(id, "Movie");
    }

    public void delete(int id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
        }
    }

    public Movie getPrev(int id) {
        List<Movie> movies = movieRepository.findAll();
        for (int i = 0; i < movies.size(); i++) {
            if (movies.get(i).getId() == id) {
                if (i == 0) {
                    return movies.get(movies.size() - 1);
                } else {
                    return movies.get(i - 1);
                }
            }
        }
        return null;
    }

    public Movie getNext(int id) {
        List<Movie> movies = movieRepository.findAll();
        for (int i = 0; i < movies.size(); i++) {
            if (movies.get(i).getId() == id) {
                if (i == movies.size() - 1) {
                    return movies.get(0);
                } else {
                    return movies.get(i + 1);
                }
            }
        }
        return null;
    }

    public List<Movie> getByActor(int id) {
        return actorService.get(id).getPlayedCharacters().stream().map(Character::getMovie).toList();
    }

    public List<Character> getCharacters(int id) {
        return get(id).getCharacters();
    }
}
