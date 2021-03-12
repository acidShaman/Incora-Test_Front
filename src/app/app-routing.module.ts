import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {FeedComponent} from './feed/feed.component';
import {CommonModule} from '@angular/common';
import {FeedResolverService} from './feed/feed-resolver.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'feed', component: FeedComponent, resolve: {feed: FeedResolverService}},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
