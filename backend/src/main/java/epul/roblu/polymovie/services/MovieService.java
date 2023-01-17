package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.repositories.MovieRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private static MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        MovieService.movieRepository = movieRepository;
    }

    public List<Movie> getByCategory(String categoryId) {
        return movieRepository.findByCategoryId(categoryId);
    }

    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    public Movie get(int id) {
        if(movieRepository.existsById(id)){
            return movieRepository.findById(id).get();
        }
        return null;
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie update(int id, Movie movie) {
        if(movieRepository.existsById(id)){
            movie.setId(id);
            return movieRepository.save(movie);
        }
        throw new ObjectNotFoundException(id, "Movie");
    }

    public void delete(int id) {
        if(movieRepository.existsById(id)){
            movieRepository.deleteById(id);
        }
    }
}
