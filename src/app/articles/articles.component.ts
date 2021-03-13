import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  feedData: any;

  constructor(private router: Router, private authService: AuthService) {
    this.feedData = this.router.getCurrentNavigation().extras.state;
    console.log(this.feedData);
  }

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  log(article: any): void {
    console.log(article);
  }
}
