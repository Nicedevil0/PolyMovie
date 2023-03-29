package epul.roblu.polymovie.services;

import epul.roblu.polymovie.models.Actor;
import epul.roblu.polymovie.repositories.ActorRepository;
import epul.roblu.polymovie.repositories.CharacterRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Comparator;
import java.util.List;

@Service
public class ActorService {
    private final ActorRepository actorRepository;

    public ActorService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public List<Actor> getAll() {
        return actorRepository.findAll().stream().sorted(Comparator.comparing(Actor::getFirstName)).toList();
    }

    public Actor get(int id) {
        return actorRepository.findById(id).orElse(null);
    }

    public Actor add(Actor actor) {
        actor.setFirstName(StringUtils.capitalize(actor.getFirstName().trim().toLowerCase()));
        actor.setLastName(StringUtils.capitalize(actor.getLastName().trim().toLowerCase()));
        return actorRepository.save(actor);
    }

    public void delete(int id) {
        actorRepository.deleteById(id);
    }
}
