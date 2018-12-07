import { Injectable } from '@angular/core';
import {User} from "../../shared/models/user-model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  REST_URL = environment.REST_URL;

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, username: string): Observable  <User> {
    return this.sendRequest('POST', `${this.REST_URL}/auth/register`, {email: email, password: password, username: username});
  }

  login(email: string, password: string): Observable<User> {
    return this.sendRequest('POST', `${this.REST_URL}/auth/login`, {email: email, password: password});
  }

  activateAccount(token: string): Observable<User> {
    return this.sendRequest('GET', `${this.REST_URL}/auth/activate/${token}`);
  }

  reVerifyEmail(emailId: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/reactivate`, {email: emailId});
  }

  updateEmail(newMailId: string, oldMailId: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/activate`, {newEmail: newMailId, oldEmail: oldMailId});
  }

  forgotPassword(emailId: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/forgot/pass`, {email: emailId});
  }

  resetPassword(password: string, token: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/reset/pass`, {password: password, token: token});
  }

  saveSocialUser(user: SocialUser): Observable<User> {
    return this.sendRequest('POST', `${this.REST_URL}/auth/social/user`, {
      provider: user.provider,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.photoUrl,
      token: user.authToken,
      uid: user.id
    });
  }

  subscribe(email: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/subscribe`, {email: email});
  }

  unsubscribe(email: string): Observable<any> {
    return this.sendRequest('PUT', `${this.REST_URL}/auth/unsubscribe`, {email: email});
  }

  private sendRequest(verb: string, url: string, body?: any, params?: any): Observable<any> {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' })

    return this.http.request(verb, url, {
      headers: headers,
      body: body,
      responseType: "json",
      params: new HttpParams({fromString: params})
    });
    // .catch((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`));
  }
}
