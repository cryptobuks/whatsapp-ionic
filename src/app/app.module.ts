import { LoginPhoneNumberPage } from './../pages/login-phone-number/login-phone-number';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from './../pages/main/main';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestePage } from '../pages/teste/teste';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    HomePage,
    ListPage,
    TestePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    HomePage,
    ListPage,
    TestePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider
  ]
})
export class AppModule {}
