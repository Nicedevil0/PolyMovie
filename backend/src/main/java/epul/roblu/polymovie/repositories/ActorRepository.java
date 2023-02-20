package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.Actor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
}