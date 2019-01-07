import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from './firebase-auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { flatMap } from 'rxjs/operators';
import { User } from '../../app/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@app/env';

const TOKEN_KEY = 'code_shopping_token';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  me: User = null;

  constructor(private http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(): Observable<{ token: string }> {
    // Requisição AJAX (Observable) --- depente --- Promessa
    return fromPromise(this.firebaseAuth.getToken())
      .pipe(
        flatMap( token => {
          return this.http.post<{token: string}>(`${environment.api.url}/login_vendor`, {token});
        })
      );
  }


  setToken(token: string) {
    this.setUserFromToken(token);
    token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
  }

  private setUserFromToken(token: string) {
    const decodedPayloadToken = new JwtHelperService().decodeToken(token);
    this.me = decodedPayloadToken ? {
        id: decodedPayloadToken.sub,
        name: decodedPayloadToken.name,
        email: decodedPayloadToken.email,
        role: decodedPayloadToken.role,
        profile: decodedPayloadToken.profile
    } : null;

    //console.log(this.me);
}


  getToken(): string | null{
    return window.localStorage.getItem(TOKEN_KEY);
  }

  isAuth(): boolean{
    const token = this.getToken();
    return !new JwtHelperService().isTokenExpired(token, 30);
  }


}
