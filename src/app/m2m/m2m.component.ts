import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';
import { Multiplex } from '../model/multiplex';
import { MultiplexService } from '../service/multiplex.service';
import { Constants } from '../common/Constants';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-m2m',
  templateUrl: './m2m.component.html',
  styleUrls: ['./m2m.component.css']
})
export class M2mComponent implements OnInit {

  movies: Array<Movie>;
  multiplexes: Array<Multiplex>;
  screens: Array<number>;

  constructor(private formbuilder: FormBuilder, private movieService: MovieService, private multiplexService: MultiplexService, private http: HttpClient, private alertService: AlertService) {
    this.movieService.getAllMovie().subscribe((response: any) => {
      this.movies = response;
    });
    this.multiplexService.getAllMultiplex().subscribe((response: any) => {
      this.multiplexes = response;
    });
  }

  m2mForm = this.formbuilder.group({
    multiplexName: [''],
    screenNumber: [''],
    movieName: ['']
  })

  ngOnInit(): void {
  }

  changeMovie(e) {
    this.movieName.setValue(e.target.value, {
      onlySelf: true
    })
  }


  setScreens() {
    this.multiplexes.forEach((multiplex, index) => {
      if (this.multiplexName.value.name === multiplex.name) {
        this.screens = Array(multiplex.screens).fill(1).map((x, index) => x + index);
      }
    })

  }

  get movieName() {
    return this.m2mForm.get('movieName');
  }

  get multiplexName() {
    return this.m2mForm.get('multiplexName');
  }

  get screenNumber() {
    return this.m2mForm.get('screenNumber');
  }

  linkM2M() {
    this.addNewMovie2Multiplex().subscribe(response => {
      this.alertService.success("Movie '" + this.multiplexName.value.name + "' is assigned to multiplex '" + this.multiplexName.value.name + "' successfully.")
      this.m2mForm.reset();
    },
      error => this.alertService.error("There is an error : " + error)
    );

  }

  // body = { multiplexId: this.multiplexName.value.id, screenNumber: this.screenNumber.value, movieId: this.movieName.value.id };

  addNewMovie2Multiplex() {
    return this.http.post<string>(Constants.m2mApiURL + `/assign`, { multiplexId: this.multiplexName.value.id, screenNumber: this.screenNumber.value, movieId: this.movieName.value.id }, { headers: { responseType: 'text' } });
  }

}
