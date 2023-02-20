package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    @Query("SELECT m FROM Movie m WHERE m.category.code = ?1")
    List<Movie> findByCategoryCode(String categoryId);
}