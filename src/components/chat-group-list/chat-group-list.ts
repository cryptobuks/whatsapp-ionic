import { Component, group } from '@angular/core';
import { ChatGroup, ChatMessage } from '../../app/model';
//import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { ChatGroupFbProvider } from '../../providers/firebase/chat-group-fb';




/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];

  /*
  constructor(private firebaseAuth: FirebaseAuthProvider,
              private chatGroupFb: ChatGroupFbProvider) {
  }
  */

  constructor(private chatGroupFb: ChatGroupFbProvider) {}



  ngOnInit(){
    this.chatGroupFb
        .list()
        .subscribe((groups) => this.groups = groups);

    this.chatGroupFb
        .onAdded()
        .subscribe((group) => {
          this.groups.unshift(group);
        });






    // Conecta ao BD Firebase    
    //const database = this.firebaseAuth.firebase.database();
 
    //slice(1) - Remover a posição 0
    // .on('value') - Retorna todos
    //.on('child_added') - Retorna todos os filhos
    /*

    database.ref('chat_groups').on('value', (data) => {
      const groups = data.val().slice(1) as ChatGroup[];
      this.groups.push(...groups);
    });

    //on('child_added') adiciona um elemento
    database.ref('chat_groups').on('child_added', (data) => {
      const group = data.val() as ChatGroup;
      this.groups.push(group);
    });

    //on('child_changed') Altera o elemento
    database.ref('chat_groups').on('child_changed', (data) => {
      const group = data.val() as ChatGroup;
      const index = this.groups.findIndex((g) => g.id == group.id);
      // se não achar o retorno é -1
      if (index !== -1) {
        this.groups[index] = group;
      }
    });
    
    */ 
  }

  formatTextMessage(message: ChatMessage){
    return message.content.length > 20 ? message.content.slice(0,20)+'...' :  message.content;
  }

}
