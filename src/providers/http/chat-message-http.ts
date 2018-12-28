import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatMessageHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatMessageHttpProvider {

  constructor(public http: HttpClient) {
  }

  create(chatGroupId: number, data: { content,type}): Observable<any> {
    const formData = new FormData();
    const chatGroupUrl = `http://whatsapp-laravel.test/api/chat_groups/${chatGroupId}/messages`;
    formData.append('content', data.content);
    formData.append('type', data.type);

    return this.http.post(chatGroupUrl, formData);
  }

}
