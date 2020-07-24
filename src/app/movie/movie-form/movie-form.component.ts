import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  @Input()
  editMode: boolean;
  @Output()
  movieOutput: EventEmitter<Movie>;
  movieForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.movieOutput = new EventEmitter();
  }

  // convenience getter for easy access to form fields
  get f() { return this.movieForm.controls; }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      director: ['',[Validators.required, Validators.minLength(4)]],
      producer: ['', [Validators.required, Validators.minLength(4)]],
      releaseDate: ['', Validators.required]
    });
  }

  saveMovie() {
    this.submitted = true;
    console.log(this.f.category.errors);
    if (this.movieForm.invalid) {
      return;
    }
    let movie = new Movie(this.f.id.value, this.f.name.value, this.f.category.value, this.f.producer.value, this.f.director.value, this.f.releaseDate.value);
    this.movieOutput.emit(movie);
  }

}
