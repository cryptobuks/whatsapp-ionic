import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../auth/firebase-auth';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import { ChatGroup, ChatMessage, Role } from '../../app/model';


/*
  Generated class for the FirebaseChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGroupFbProvider {

  database;

  constructor(private firebaseAuth: FirebaseAuthProvider,
              private auth: AuthProvider) {
    this.database = this.firebaseAuth.firebase.database();           
  }


  list(): Observable<ChatGroup[]> {
    return Observable.create((observer) => {
        this.database.ref('chat_groups').orderByChild('updated_at').once('value', (data) => {
          const groupsRaw = data.val() as Array<ChatGroup>;
          const groupsKeys = Object.keys(groupsRaw);
          const groups = [];
          for (const key of groupsKeys) {
              groupsRaw[key].is_member = this.getMember(groupsRaw[key]);
              groupsRaw[key].last_message = this.getLastMessage(groupsRaw[key]);
              groups.push(groupsRaw[key]);
          }
         
          observer._next(groups);
        }, (error) => console.log(error));
    });
  }


  onAdded(): Observable<ChatGroup> {
    return Observable.create((observer) => {
        this.database.ref('chat_groups')
            .orderByChild('created_at')
            .startAt(Date.now())
            .on('child_added', (data) => {
            const group = data.val() as ChatGroup;
              group.is_member = this.getMember(group);
              group.last_message = this.getLastMessage(group);         
              observer._next(group);
        }, (error) => console.log(error));
    });
  }


  private getMember(group: ChatGroup): Observable<boolean> {
    return Observable.create(observer => {
      // se for um vendedor
      if (this.auth.me.role === Role.SELLER) {
        observer.next(true);
        return;
      }
      this.database
          .ref(`chat_groups_users/${group.id}/${this.auth.me.profile.firebase_uid}`)
          .on('value', (data) => {
            return data.exists() ? observer.next(true) : observer.next(false);
          });
    });
  }

  /**
   * Retorna a última mensagem
   * 
   * @param group 
   */
  private getLastMessage(group: ChatGroup): Observable<ChatMessage> {
    return Observable.create(observer => {
        this.database
            .ref(`chat_groups_messages/${group.id}/last_message_id`)
            .on('value', (data) => {
                if (!data.exists()) {
                    return;
                }
                const lastMessageId = data.val();                
                this.getMessage(group, lastMessageId)
                    .subscribe(message => observer.next(message));
            });
    });
  }

  /**
   * Retorna o id da última mensagem
   * 
   * @param group 
   * @param lastMessageId 
   */
  private getMessage(group: ChatGroup, lastMessageId: string): Observable<ChatMessage> {
    return Observable.create(observer => {
        this.database
            .ref(`chat_groups_messages/${group.id}/messages/${lastMessageId}`)
            .once('value', (data) => {
                const message = data.val() as ChatMessage;
                this.getUser(message.user_id)
                    .subscribe(user => {
                        message.user = user;
                        observer.next(message);
                    });
            });
    });
  }

  private getUser(userId) {
    return Observable.create(observer => {
        this.database
            .ref(`users/${userId}`)
            .once('value', (data) => {
                const user = data.val();
                observer.next(user);
            })
    })
  }




}
