import { LoginPhoneNumberPage } from './../pages/login-phone-number/login-phone-number';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AuthProvider } from '../providers/auth/auth';
import { ChatGroupFbProvider } from '../providers/firebase/chat-group-fb';
import { ChatMessageHttpProvider } from '../providers/http/chat-message-http';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';

import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from './../pages/main/main';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestePage } from '../pages/teste/teste';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';

import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessagePageModule } from '../pages/chat-messages/chat-message/chat-message.module';

import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';



function jwtFactory(authService: AuthProvider) {
  return {
      whitelistedDomains: [
        new RegExp('whatsapp-laravel.test/*'),
        new RegExp('192.168.0.106:8000/*')
      ],
      tokenGetter: () => {
        return authService.getToken();
      }
  }
}



@NgModule({
  declarations: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    HomePage,
    ListPage,
    TestePage,
    ChatGroupListComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagePageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
      }
    })   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    HomePage,
    ListPage,
    TestePage,
    ChatGroupListComponent,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    ChatGroupFbProvider
  ]
})
export class AppModule {}
