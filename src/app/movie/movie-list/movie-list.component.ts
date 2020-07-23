import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  isAdmin: boolean;
  @Input()
  movies: Array<Movie>;
  @Output() movie_update: EventEmitter<Movie>;
  @Output() movie_delete: EventEmitter<number>;

  constructor() {
    this.movie_update = new EventEmitter<Movie>();
    this.movie_delete = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  updateMovie(movie: Movie) {
    this.movie_update.emit(movie);
  }

  onDelete(id: number) {
    this.movie_delete.emit(id);
  }

}
