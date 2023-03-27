package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.Movie;
import epul.roblu.polymovie.models.User;
import epul.roblu.polymovie.repositories.MovieRepository;
import epul.roblu.polymovie.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public UserService(UserRepository userRepository,
                       MovieRepository movieRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public User getByLogin(String username) {
        if(userRepository.existsByLogin(username)){
            return userRepository.findByLogin(username).get();
        }
        return null;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void save(User user){
        userRepository.save(user);
    }

    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public User addFavorite(User user, int movieId) {
        Movie movie = movieRepository.findById(movieId).get();
        user.getFavorites().add(movie);
        userRepository.save(user);
        return user;
    }

    public User deleteFavorite(User user, int id) {
        Movie movie = movieRepository.findById(id).get();
        user.getFavorites().remove(movie);
        userRepository.save(user);
        return user;
    }

    public List<User> delete(int id) {
        userRepository.deleteById(id);
        return this.getAll();
    }
}
