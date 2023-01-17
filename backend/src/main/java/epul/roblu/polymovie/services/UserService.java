package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.User;
import epul.roblu.polymovie.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getByLogin(String username) {
        if(userRepository.existsByLogin(username)){
            return userRepository.findByLogin(username).get();
        }
        return null;
    }

    public void save(User user){
        userRepository.save(user);
    }

    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
