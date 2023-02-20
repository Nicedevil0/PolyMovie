package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.Actor;
import epul.roblu.polymovie.repositories.ActorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {
    private final ActorRepository actorRepository;

    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public List<Actor> getAll() {
        return actorRepository.findAll();
    }

    public Actor get(int id) {
        return actorRepository.findById(id).orElse(null);
    }
}
