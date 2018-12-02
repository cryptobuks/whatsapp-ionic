import { ChatGroup } from './../../app/model';
import { Component } from '@angular/core';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';

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

  constructor(private firebaseAuth: FirebaseAuthProvider) {

  }

  ngOnInit(){
    // Conecta ao BD Firebase
    const database = this.firebaseAuth.firebase.database();
 
    //slice(1) - Remover a posição 0
    // .on('value') - Retorna todos
    //.on('child_added') - Retorna todos os filhos
    /*

    database.ref('chat_groups').on('value', (data) => {
      const groups = data.val().slice(1) as ChatGroup[];
      this.groups.push(...groups);
    });
    */

  /**
   * on('child_added') adiciona um elemento
  */
  database.ref('chat_groups').on('child_added', (data) => {
    const group = data.val() as ChatGroup;
    this.groups.push(group);
  });

  /**
   * on('child_changed') Altera o elemento
   */
  database.ref('chat_groups').on('child_changed', (data) => {
    const group = data.val() as ChatGroup;
    const index = this.groups.findIndex((g) => g.id == group.id);
    // se não achar o retorno é -1
    if (index !== -1) {
      this.groups[index] = group;
    }
  });
 
  }

}
