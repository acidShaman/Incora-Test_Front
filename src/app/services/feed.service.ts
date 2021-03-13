import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getFeed(): Observable<any> {
    return this.http.get(`${this.URL}/feed`).pipe(
      tap(
        data => {
          console.log(data);
          return data;
        }
      )
    );
  }

  deleteFeed(feedId: number): Observable<any> {
    return this.http.delete(`${this.URL}/feed/${feedId}/delete/`);
  }

  createFeed(link: string): Observable<any> {
    const formData = new FormData();
    formData.append('link', link);
    return this.http.post(`${this.URL}/feed/new/`, formData);
  }

  editFeed(id: number, link: string): Observable<any> {
    const formData = new FormData();
    formData.append('link', link);
    return this.http.put(`${this.URL}/feed/${id}/edit/`, formData);
  }
}
