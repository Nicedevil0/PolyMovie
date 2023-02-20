import { Actor } from './../../models/actor.model';
import { Component } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent {
  actors: Actor[] = []

  constructor(private actorService: ActorService) {
    this.actorService.getAll().subscribe(data => {
      this.actors = data;
    });
  }
}
