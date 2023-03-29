package epul.roblu.polymovie.repositories;

import epul.roblu.polymovie.models.Category;
import epul.roblu.polymovie.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

}