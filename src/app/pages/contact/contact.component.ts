
import { Component, Inject, OnInit } from '@angular/core';
import { Message } from 'src/app/model/Message.model';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit{
  newMessage= new Message;
  showAlert: boolean;

  constructor(private serviceMes:MessageService){}


  ngOnInit(): void {
   
  }
  ajouterMessage(){
    this.serviceMes.ajouterMessage(this.newMessage).subscribe(ms =>{
      console.log(ms);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // cacher l'alerte après 3 secondes
    });
  }
  }
