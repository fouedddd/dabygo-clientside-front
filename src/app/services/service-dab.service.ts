import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DAB } from '../model/Dab.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceDABService {
  private getAllDAB: string = 'http://localhost:8080/GetAllDAB';

  constructor(private http: HttpClient) { }
  //methode afficher tous les DAB
  listeDAB(): Observable<DAB[]> {
    return this.http.get<DAB[]>(this.getAllDAB, httpOptions);
  }
}
