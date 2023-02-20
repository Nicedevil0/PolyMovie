package epul.roblu.polymovie.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryDTO {
    private String code;
    private String label;
    private String image;
    private int nbMovies;
}
