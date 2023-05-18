import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/Message.model';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private addmess: string = 'http://localhost:8080/addMessage';

  constructor(private http: HttpClient) { }

  ajouterMessage(ms:Message ): Observable<Message> {
    return this.http.post<Message>(this.addmess, ms, httpOptions);
  }
}
