import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login/login.component';
import {FeedComponent} from './feed/feed.component';
import {FeedResolverService} from './feed/feed-resolver.service';
import {ArticlesComponent} from './articles/articles.component';
import {ArticleComponent} from './article/article.component';
import {ArticleResolverService} from './article/article-resolver.service';
import {AuthGuard} from './shared/auth.guard';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'feed', component: FeedComponent, canActivate: [AuthGuard], resolve: {feed: FeedResolverService}},
  {path: 'feed/:id/articles', component: ArticlesComponent, canActivate: [AuthGuard]},
  {
    path: 'feed/:id/articles/:article_id',
    component: ArticleComponent,
    canActivate: [AuthGuard],
    resolve: {article: ArticleResolverService}
  },
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
