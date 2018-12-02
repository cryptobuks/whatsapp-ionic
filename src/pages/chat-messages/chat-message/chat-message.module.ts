import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagePage } from './chat-message';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar';
import { ChatContentDetailComponent } from '../chat-content-detail/chat-content-detail';
import { ChatContentLeftComponent } from '../chat-content-left/chat-content-left';
import { ChatContentRightComponent } from '../chat-content-right/chat-content-right';
import { ChatFooterComponent } from '../chat-footer/chat-footer';

@NgModule({
  declarations: [
    ChatMessagePage,
    ChatAvatarComponent,
    ChatContentDetailComponent,
    ChatContentLeftComponent,
    ChatContentRightComponent,
    ChatFooterComponent
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagePage),
  ],
})
export class ChatMessagePageModule {}