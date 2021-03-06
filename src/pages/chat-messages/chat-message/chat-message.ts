import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { ChatMessageFbProvider } from './../../../providers/firebase/chat-message-fb';


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

  chatGroup: ChatGroup;
  messages: ChatMessage[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private chatMessageFb: ChatMessageFbProvider) {
    //this.chatGroup = this.navParams.get('chat_group');
    this.chatGroup = {
      id: 1,
      name: '',
      photo_url: '',
    }          
  }

  ionViewDidLoad() {
    this.chatMessageFb.latest(this.chatGroup)
        .subscribe((messages) => this.messages = messages);
  }

}
