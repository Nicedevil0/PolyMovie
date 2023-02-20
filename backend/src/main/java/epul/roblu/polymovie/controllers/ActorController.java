package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.models.Actor;
import epul.roblu.polymovie.services.ActorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActorController {
    private ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping("/public/actors")
    public List<Actor> getAll() {
        return actorService.getAll();
    }

    @GetMapping("/public/actors/{id}")
    public Actor getOne(@PathVariable int id) {
        return actorService.get(id);
    }
}
