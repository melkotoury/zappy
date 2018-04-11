import { Injectable } from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Tweets} from '../../models/tweets';

declare const Pusher: any;
const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  pusher: any;
  // Declare empty list of tweets



  tweetsChannel: any;

  constructor(private _http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key,{
      cluster: environment.pusher.cluster,
      encrypted:environment.pusher.encrypted,
      apiEndpoint: `${API_URL}/tweets`
    });
    this.tweetsChannel= this.pusher.subscribe('tweets');
  }




  getAllTweets(): Observable < Tweets[] > {
    return this
      ._http
      .get(`${API_URL}/tweets`)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private  extractData(res: Response) {
    // return res.json();
    return res;
  }
  private  handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
