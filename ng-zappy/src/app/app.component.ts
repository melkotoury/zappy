import { Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import {Tweets} from '../../models/tweets';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  allTweets: Tweets[];
  statusCode: number;

  constructor(
    private apiService: ApiService) {
  }

  // Angular 5 Life Cycle event when component has been initialized
  ngOnInit() {
       this.getAllTweets();

  }

  // Fetch all clinics
  getAllTweets() {
    this
      .apiService
      .getAllTweets()
      .subscribe(data => this.allTweets = data, errorCode => this.statusCode = errorCode);
  }
}
