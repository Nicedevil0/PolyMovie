package epul.roblu.polymovie.controllers;

import epul.roblu.polymovie.models.Actor;
import epul.roblu.polymovie.services.ActorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActorController {
    private final ActorService actorService;

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

    @PostMapping("/admin/actors")
    public Actor add(@RequestBody Actor actor) {
        return actorService.add(actor);
    }

    @DeleteMapping("/admin/actors/{id}")
    public void delete(@PathVariable int id) {
        actorService.delete(id);
    }
}
