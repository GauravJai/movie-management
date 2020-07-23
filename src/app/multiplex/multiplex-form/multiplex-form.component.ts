import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Multiplex } from 'src/app/model/multiplex';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MultiplexComponent } from '../multiplex.component';

@Component({
  selector: 'multiplex-form',
  templateUrl: './multiplex-form.component.html',
  styleUrls: ['./multiplex-form.component.css']
})
export class MultiplexFormComponent implements OnInit {
  @Input()
  editMode:boolean;
  @Output()
  multiplex: EventEmitter<Multiplex>;
  multiplexForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.multiplex = new EventEmitter();
   }

  // convenience getter for easy access to form fields
  get f() { return this.multiplexForm.controls; }

  ngOnInit(): void {
    this.multiplexForm = this.formBuilder.group({
      id: '',
      name: ['',Validators.minLength(3)],
      address: [''],
      screens: ['']
    });
  }

  saveMultiplex() {
    let multiplex = new Multiplex(this.f.id.value, this.f.name.value, this.f.address.value, this.f.screens.value);
    this.multiplex.emit(multiplex);
  }


}
