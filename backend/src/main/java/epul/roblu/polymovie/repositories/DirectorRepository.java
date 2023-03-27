package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Integer> {
}