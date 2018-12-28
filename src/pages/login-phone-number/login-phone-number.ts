//import { LoginOptionsPage } from './../login-options/login-options';
import { ChatMessagePage } from './../chat-messages/chat-message/chat-message';
//import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authServer: AuthProvider) {
  }

  // algo inicial para que se o usuário estiver autenticado já vai para mainPag
  // Carregar o firebaseui-form
  // se autenticado redireciona pro mainPag ou para customerCreatePag
  // se voltar para página carregar o firebaseui-form 
  ionViewDidLoad() {
    this.firebaseAuth.getToken().then((token) => console.log(token), (error) => console.log(error));
    const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.handleAuthUser();
          unsubscribed();
        }
    });
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
  }

  handleAuthUser(){
    this.authServer
      .login()
      .subscribe((token) => {
        // Abre na página principal
        //this.redirectToMainPage();
      }, (responseError) => {
        // Redireciona para criação da conta com o firebaseui-form
        this.firebaseAuth
          .makePhoneNumberForm('#firebase-ui')
          .then(() => this.handleAuthUser());
        ;
        this.redirectCustumerCreatePage();
      });
  }

  redirectToMainPage(){
    this.navCtrl.setRoot(ChatMessagePage);
  }

  redirectCustumerCreatePage(){
    this.navCtrl.push(ChatMessagePage)
  }


}
