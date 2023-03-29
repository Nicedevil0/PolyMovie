import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ActorService } from './../../services/actor.service';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { MovieService } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { Actor } from 'src/app/models/actor.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation.dialog';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent {
  actor!: Actor | null;
  movies: Movie[] = [];
  currentUser!: User | null;
  age: number = 0;

  constructor(private route: ActivatedRoute, private actorService: ActorService, private movieService: MovieService, private userService: UserService, private storageService: StorageService, public dialog: MatDialog, private notificationService: NotificationService, private router: Router) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.actorService.getById(params.get('id') as unknown as number).subscribe((actor) => {
        this.actor = actor;
        let now = new Date();
        let birth = new Date(actor.birth);
        this.age = Math.floor((now.getTime() - birth.getTime()) / (1000 * 3600 * 24 * 365));
      });
      this.movieService.getByActor(params.get('id') as unknown as number).subscribe((movies) => {
        this.movies = movies;
      });
      this.currentUser = this.storageService.getUser();
      this.storageService.changeEmitted$.subscribe((user) => {
        this.currentUser = user;
      });
    });
  }

  addToFavorites(movie: Movie) {
    if (this.currentUser) {
      this.userService.addToFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }

  removeFromFavorites(movie: Movie) {
    if (this.currentUser) {
      this.userService.removeFromFavorites(movie).subscribe((user) => {
        this.storageService.saveUser(user);
      });
    }
  }

  delete(actorId: number | undefined) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: 'Confirmer la suppression de l\'acteur ? \n Attention, les personnages associés seront également supprimés.'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result && actorId) {
        this.actorService.delete(actorId).subscribe(() => {
          this.notificationService.showSuccess('Acteur supprimé');
          this.router.navigateByUrl('/actors');
        });
      }
    });
  }
}
