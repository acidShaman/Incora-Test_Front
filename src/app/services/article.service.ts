import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }


  private parseXml(xml): any {
    const parse = require('xml2js').parseString;
    let json;
    parse(xml, ((err, result) => {
      json = result;
    }));
    return json;
  }

  getArticleByUrl(article): Observable<any> {
    return this.http.post('http://localhost:8000/article/', article).pipe(
      tap( data => {
        return this.parseXml(data);
        }
      )
    );
  }
}
