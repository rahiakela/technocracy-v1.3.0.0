import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../../shared/models/profile-model";
import {User} from "../../shared/models/user-model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _token: string;

  REST_URL = environment.REST_URL;

  constructor(private http: HttpClient) {

  }

  getProfile(user: User): Observable<Profile> {
    const userId = user._id;
    this.token = user.jwtToken;
    return this.sendRequest('GET', `${this.REST_URL}/profile/${userId}`);
  }

  saveProfile(user: User, profile: any): Observable<Profile> {
    const userId = user._id;
    this.token = user.jwtToken;
    return this.sendRequest('POST', `${this.REST_URL}/profile/${userId}`, profile);
  }

  updateProfile(user: User, profile: any): Observable<Profile> {
    const userId = user.profile._id;
    this.token = user.jwtToken;
    return this.sendRequest('PUT', `${this.REST_URL}/profile/${userId}`, profile);
  }

  updateProfileImage(userId: string, user: User): Observable<User> {
    this.token = user.jwtToken;
    return this.sendRequest('PUT', `${this.REST_URL}/profile/photo/${userId}`, user);
  }

  private sendRequest(verb: string, url: string, body?: any, params?: any): Observable<any> {

    let headers = null;
    // add JWT token with request headers
    const authToken = this.token;
    if (authToken) {
      headers = new HttpHeaders({ 'x-access-token': authToken, 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' })
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' })
    }

    return this.http.request(verb, url, {
      headers: headers,
      body: body,
      responseType: "json",
      params: new HttpParams({fromString: params})
    });
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }
}
