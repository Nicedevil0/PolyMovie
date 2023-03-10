package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLogin(String username);
    Boolean existsByLogin(String username);
}
