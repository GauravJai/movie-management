import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) { }
  getAllMovie() {
    return this.http.get(Constants.movieApiURL);
  }

  getOneMovie(id: number) {
    return this.http.get(Constants.movieApiURL + '/' + id);
  }

  addNewMovie(movie: Movie) {
    return this.http.post(Constants.movieApiURL, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(Constants.movieApiURL + '/' + movie.id, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(Constants.movieApiURL + '/' + id, { responseType: 'text' });
  }
}
