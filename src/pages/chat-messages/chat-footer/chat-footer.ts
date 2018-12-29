import { TextInput } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { ChatMessageHttpProvider } from '../../../providers/http/chat-message-http';
import Timer  from 'easytimer.js/dist/easytimer.min';


/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

  @ViewChild('inputFileImage')
  inputFileImage: TextInput;

  text: string = '';
  messageType = 'text';

  timer = new Timer();


  constructor(private chatMessageHttp: ChatMessageHttpProvider) {
  }

  sendMessageText(){
    this.sendMessage({content: this.text, type: 'text'});
  }

  sendMessageImage(files: FileList){
    if(!files.length){
      return;
    }
    this.sendMessage({content: files[0], type: 'image'});
  }


  sendMessage(data:{content,type}){
    this.chatMessageHttp
      .create(1, data)
      .subscribe(() => console.log('Texto enviado'));
  }


  selectImage(){
    const nativeElement: HTMLElement = this.inputFileImage.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  holdAudioButton(){
    //console.log('Dedão no botão');
    this.timer.start();
    this.timer.addEventListener('secondsUpdated', (e) => {
      const time = this.getMinuteSeconds();
      this.text = `Gravando:  ${time}`;
    });

  }

  private getMinuteSeconds(){
    return this.timer.getTimeValues().toString().substring(3);
  }

  releaseAudioButton(){
    //console.log('Tirou o Dedão no botão');
    this.timer.stop();
    this.text = '';
  }

  getIconSendMessage(){
    if(this.messageType === 'text') {
      return this.text === '' ? 'mic' : 'send';
    }

    return 'mic';
  }


}
