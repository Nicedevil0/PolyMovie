import {Movie} from 'src/app/models/movie.model';
import {ActorService} from './../../services/actor.service';
import {Category} from './../../models/category.model';
import {CategoryService} from './../../services/category.service';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from 'src/app/services/movie.service';
import {Actor} from 'src/app/models/actor.model';
import {Director} from 'src/app/models/director.model';
import {DirectorService} from 'src/app/services/director.service';
import {map, Observable, startWith} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.scss']
})
export class FormMovieComponent {
  useCase: string = 'Nouveau';
  allCategories: Category[] = [];
  allActors: Actor[] = [];
  allDirectors: Director[] = [];
  movie: Movie = new Movie(0, '', 0, new Date(), 0, 0, '', new Director(0, '', ''), new Category('', '', ''));

  constructor(private route: ActivatedRoute, private movieService: MovieService, private categoryService: CategoryService, private actorService: ActorService, private directorService: DirectorService) {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.useCase = 'Modification';
        this.movieService.getById(params.get('id') as unknown as number).subscribe((movie) => {
          this.movie = movie;
          this.setupDates()
          console.log(this.movie);
        });
      }
    });
    categoryService.getAll().subscribe((categories) => {
      this.allCategories = categories;
    });
    actorService.getAll().subscribe((actors) => {
      this.allActors = actors;
    });
    directorService.getAll().subscribe((directors) => {
      this.allDirectors = directors;
    });
    this.actorCtrl.valueChanges.pipe(
      startWith(null),
      map((str: string | null) => str !== null ? this._filter(str) : this.allActors.slice())).subscribe((actors) => {
      this.filteredActors = actors;
    });
  }

  saveMovie(): void {
    console.log(this.movie);
    this.movieService.create(this.movie).subscribe(() => {
      console.log('ttoo');
    })
    // if(!checkErrors()) {
    //   if (this.useCase === 'Modification') {
    //     this.movieService.update(this.movie).subscribe(() => {
    //       console.log('Movie updated');
    //     });
    //   } else {
    //     this.movieService.create(this.movie).subscribe(() => {
    //       console.log('Movie created');
    //     });
    //   }
    // }
  }

  setupDates(): void {
    this.movie.release = new Date(this.movie.release).toISOString().split('T')[0];
    const hours = Math.floor(this.movie.duration as number / 60);
    if (hours < 10) {
      this.movie.duration = '0' + hours + ':' + (this.movie.duration as number % 60);
    } else {
      this.movie.duration = hours + ':' + (this.movie.duration as number % 60);
    }
  }

  onChangeDirector(): void {
    this.movie.director = this.allDirectors.find((d) => d.id == this.movie.director?.id) as Director;
  }

  onChangeCategory(): void {
    this.movie.category = this.allCategories.find((c) => c.code == this.movie.category?.code) as Category;
  }

  // gestion du composant des acteurs
  separatorKeysCodes: number[] = [ENTER, COMMA];
  actorCtrl = new FormControl();
  filteredActors: Actor[] = [];
  actors: Actor[] = [];

  @ViewChild('actorsInput') actorsInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = this.allActors.find((a) => a.id === event.value as unknown as number);
    if (value) {
      this.actors.push(value);
    }
    event.chipInput.clear();
    this.actorCtrl.setValue(null);
  }

  remove(actor: Actor): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const a = this.allActors.find((a) => a.id === event.option.value as unknown as number);
    if (a) {
      this.actors.push(a);
      this.actorsInput.nativeElement.value = '';
      this.actorCtrl.setValue(null);
    }
  }

  private _filter(value: any): Actor[] {
    if (value instanceof Number) {
      return this.allActors.filter(actor =>
        this.actors.find((a) => a.id === actor.id) === undefined);
    }
    const filterValue = value.toLowerCase();
    return this.allActors.filter(actor =>
      this.actors.find((a) => a.id === actor.id) === undefined &&
      (actor.firstName.toLowerCase().includes(filterValue) ||
        actor.lastName.toLowerCase().includes(filterValue)));
  }
}
