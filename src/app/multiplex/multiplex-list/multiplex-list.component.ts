import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Multiplex } from 'src/app/model/multiplex';

@Component({
  selector: 'multiplex-list',
  templateUrl: './multiplex-list.component.html',
  styleUrls: ['./multiplex-list.component.css']
})
export class MultiplexListComponent implements OnInit {

  @Input()
  multiplexes: Array<Multiplex>;
  @Output() multiplex_update: EventEmitter<Multiplex>;
  @Output() multiplex_delete: EventEmitter<number>;

  constructor() {
    this.multiplex_update = new EventEmitter<Multiplex>();
    this.multiplex_delete = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  updateMultiplex(multiplex: Multiplex) {
    this.multiplex_update.emit(multiplex);
  }

  onDelete(id: number) {
    this.multiplex_delete.emit(id);

  }


}
