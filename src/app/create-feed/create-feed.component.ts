import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FeedService} from '../services/feed.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FeedComponent} from '../feed/feed.component';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.css']
})
export class CreateFeedComponent implements OnInit {
  linkInput: FormControl;

  constructor(private feedService: FeedService,
              private dialogRef: MatDialogRef<FeedComponent>) { }

  ngOnInit(): void {
    this.linkInput = new FormControl('', [Validators.required, Validators.pattern(/(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gm)]);
    this.linkInput.valueChanges.subscribe(console.log);
  }


  createNewFeed(): void {
    this.feedService.createFeed(this.linkInput.value).subscribe( data => {
      if (data) {
        this.dialogRef.close(data);
      }
    });
  }
}
