import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: any;

  constructor(private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.article = this.activatedRoute.snapshot.data.article;
  }

  ngOnInit(): void {

  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
