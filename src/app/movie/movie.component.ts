import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Array<Movie>;
  editMode: boolean;
  showForm: boolean;
  @ViewChild(MovieFormComponent, { static: false }) formComponent: MovieFormComponent;

  constructor(private movieService: MovieService, private alertService: AlertService) {
    this.editMode = false;
    this.showForm = false;
  }

  ngOnInit(): void {
    this.movieService.getAllMovie().subscribe((response: any) => {
      this.movies = response;
    })
  }

  onMovieFormSubmit(movie: Movie) {
    if (this.editMode) {
      this.updateMovie(movie);
    } else {
      this.addMovie(movie);
    }
  }

  addMovie(movie: Movie) {
    this.movieService.addNewMovie(movie).subscribe(
      (response: Movie) => {
        //console.log(response);
        this.movies.push(response);
        this.showForm = false;
        this.alertService.success("Movie '" + response.name + "' has been added successfully");
      },
      error => this.alertService.error("There is an error : "+error)
    );
  }

  receiveMovie($event: Movie) {
    this.editMode = true;
    this.showForm = true;
    //console.log(this.formComponent);
    this.formComponent.movieForm.setValue({
      id: $event.id,
      name: $event.name,
      category: $event.category,
      producer: $event.producer,
      director: $event.director,
      releaseDate: $event.releaseDate 
    });
  }

  updateMovie(movie: Movie) {
    this.movieService.updateMovie(movie).subscribe(
      (response: Movie) => {
        this.movies[this.movies.indexOf(movie)] = response;
        this.editMode = false;
        this.showForm = false;
        this.formComponent.movieForm.reset();
        this.alertService.success("Movie '" + response.name + "' has been updated successfully");
      },
      error => this.alertService.error("There is an error : "+error)
    );
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(
      response => {
        var index = this.movies.map(movie => {
          return movie.id;
        }).indexOf(id);
        this.alertService.success("Movie '" + this.movies[index].name + "' has been deleted successfully");
        this.movies.splice(index, 1);
      },
      error => this.alertService.error("There is an error : "+error)
    );
  }

  toggleAddForm() {
    this.showForm = !this.showForm;
  }

}
