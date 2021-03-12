import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import * as xml2js from 'xml2js';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.feed = this.parseXml(this.activatedRoute.snapshot.data.feed);
    console.log(this.feed);
  }

  private parseXml(xml): any {
    const parse = require('xml2js').parseString;
    let json;
    parse(xml, ((err, result) => {
      json = result;
    }));
    return json;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  openWindow(link: string): void {
    window.open(link, '_blank');
  }
}
