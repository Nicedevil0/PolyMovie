package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.User;
import epul.roblu.polymovie.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (userRepository.existsByLogin(username)) {
            User user = userRepository.findByLogin(username).get();
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add((GrantedAuthority) user::getRole);
            return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
