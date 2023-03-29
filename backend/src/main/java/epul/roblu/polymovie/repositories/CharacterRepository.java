package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    void deleteAllByActorId(int actorId);
}
