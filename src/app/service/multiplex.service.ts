import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../common/Constants';
import { Multiplex } from '../model/multiplex';

@Injectable({
  providedIn: 'root'
})
export class MultiplexService {


  constructor(private http: HttpClient) { }
  getAllMultiplex() {
    return this.http.get(Constants.multiplexApiURL + `/multiplex`);
  }

  getOneMultiplex(id: number) {
    return this.http.get(Constants.multiplexApiURL + `/multiplex/`  + id);
  }

  addNewMultiplex(multiplex: Multiplex) {
    return this.http.post(Constants.multiplexApiURL + `/multiplex`, multiplex);
  }

  updateMultiplex(multiplex: Multiplex) {
    return this.http.put(Constants.multiplexApiURL + `/multiplex/` + multiplex.id, multiplex);
  }

  deleteMultiplex(id: number) {
    return this.http.delete(Constants.multiplexApiURL + `/multiplex/` + id, {responseType: 'text'});
  }
}
