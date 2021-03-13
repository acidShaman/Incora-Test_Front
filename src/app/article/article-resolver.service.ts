import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {async, Observable} from 'rxjs';
import {ArticleService} from '../services/article.service';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<any>{

  constructor(private router: Router, private articleService: ArticleService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const rawArticle = this.router.getCurrentNavigation().extras.state;
    return this.articleService.getArticleByUrl(rawArticle);
  }
}
