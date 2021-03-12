import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FeedService} from '../services/feed.service';

@Injectable({
  providedIn: 'root'
})
export class FeedResolverService implements Resolve<any> {

  constructor(private feedService: FeedService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.feedService.getFeed();
  }
}
