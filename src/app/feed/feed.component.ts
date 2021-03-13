import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import * as xml2js from 'xml2js';
import {FeedService} from '../services/feed.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateFeedComponent} from '../create-feed/create-feed.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
              private router: Router, private feedService: FeedService, private dialog: MatDialog,
              ) {

    this.activatedRoute.snapshot.data.feed.forEach((value) => {
      const json = this.parseXml(value.data);
      if (json.rss) {
        this.feed.push({id: value.id, json, link: value.link});
      }
      console.log('Feed', this.feed);
    });
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

  deleteFeed(feedItem: any): void {
    this.feedService.deleteFeed(feedItem.id).subscribe(data => console.log(data));
    this.feed = this.feed.filter(item => item.id !== feedItem.id);
  }

  createFeed(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(CreateFeedComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log('Done!');
        let rawFeed;
        this.feedService.getFeed().subscribe(feedList => {
          rawFeed = feedList;
          this.feed = [];
          rawFeed.forEach(feed => {
            const json = this.parseXml(feed.data);
            if (json.rss) {
              this.feed.push({id: feed.id, json, link: feed.link});
            }
            console.log('Feed', this.feed);
          });
        });
      }
    });
  }
}
