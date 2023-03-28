import { Actor } from './../../models/actor.model';
import { Component } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent {
  actors: Actor[] = []
  currentUser!: User | null;

  constructor(private actorService: ActorService, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.actorService.getAll().subscribe(data => {
      this.actors = data;
    });
  }
}
