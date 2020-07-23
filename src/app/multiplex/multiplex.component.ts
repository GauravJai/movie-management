import { Component, OnInit, ViewChild } from '@angular/core';
import { Multiplex } from '../model/multiplex';
import { MultiplexFormComponent } from './multiplex-form/multiplex-form.component';
import { MultiplexService } from '../service/multiplex.service';

@Component({
  selector: 'app-multiplex',
  templateUrl: './multiplex.component.html',
  styleUrls: ['./multiplex.component.css']
})
export class MultiplexComponent implements OnInit {

  multiplexes: Array<Multiplex>;
  editMode: boolean;
  showForm: boolean;
  @ViewChild(MultiplexFormComponent, { static: false }) formComponent: MultiplexFormComponent;
  constructor(private multiplexService: MultiplexService) {
    this.editMode = false;
    this.showForm = false;
   }

  ngOnInit(): void {
    this.multiplexService.getAllMultiplex().subscribe((response: any) => {
      this.multiplexes = response;
    })
  }

  onMultiplexFormSubmit(multiplex: Multiplex) {
    if (this.editMode) {
      this.updateMultiplex(multiplex)
    } else {
      this.addMultiplex(multiplex);
    }
  }

  submitMultiplex(multiplex: Multiplex){
    if(this.editMode){
      this.updateMultiplex(multiplex);
    }else{
      this.addMultiplex(multiplex);
    }
  }

  addMultiplex(multiplex: Multiplex) {
    // add it to collection
    // this.products.push(product);
    this.multiplexService.addNewMultiplex(multiplex).subscribe(
      // calling this method is notification
      (response: Multiplex) => {
        console.log(response);
        this.multiplexes.push(response);
        this.showForm = false;
      },
      error => console.log(error)
    );
  }

  receiveMultiplex($event: Multiplex) {
    this.editMode = true;
    this.showForm = true;
     this.formComponent.multiplexForm.setValue({
      id: $event.id,
      name: $event.name,
      address: $event.address,
      screens: $event.screens
    });
  }

  updateMultiplex(multiplex: Multiplex) {
    this.multiplexService.updateMultiplex(multiplex).subscribe(
      (response: Multiplex) => {
         this.multiplexes[this.multiplexes.indexOf(multiplex)] = response;
         this.editMode = false;
         this.showForm = false;
         this.formComponent.multiplexForm.reset();
      },
      error => console.log(error)
    );
  }

  toggleAddForm(){
    this.showForm = !this.showForm;
  }

  deleteMultiplex(id: number){
    this.multiplexService.deleteMultiplex(id).subscribe(
      response => {
        var index = this.multiplexes.map(multiplex => {
          return multiplex.id;
        }).indexOf(id);
        this.multiplexes.splice(index, 1);
      },
      error => console.log(error)
    );
  }

}
