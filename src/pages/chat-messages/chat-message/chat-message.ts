import { Observable } from 'rxjs/Observable';
import { FirebaseAuthProvider } from './../../../providers/auth/firebase-auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatMessage } from '../../../app/model';

/**
 * Generated class for the ChatMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-message',
  templateUrl: 'chat-message.html',
})
export class ChatMessagePage {

  messages: ChatMessage[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider) {
  }

  ionViewDidLoad() {

    const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups/1/messages').on('child_added', (data) => {
      const message = data.val();
      message.user = Observable.create((observer) => {
        database.ref(`users/${message.user_id}`).on('value', (data) => {
          //mensage.name
          const user = data.val();
          observer.next(user);
          //console.log(message);
        });
      });

      //message.user.subscribe((user) => console.log(user));
      this.messages.push(message);

    });

  }

}
