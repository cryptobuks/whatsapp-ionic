import { LoginPhoneNumberPage } from './../pages/login-phone-number/login-phone-number';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessagePageModule } from '../pages/chat-messages/chat-message/chat-message.module';

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
    ChatMessagePageModule
    
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
    CustomerHttpProvider
  ]
})
export class AppModule {}
