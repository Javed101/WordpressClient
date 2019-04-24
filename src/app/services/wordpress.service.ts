import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  url = `http://localhost/myblog/?rest_route=/wp/v2/`;
  totalPosts = null;
  pages: any;

  constructor(private http: HttpClient) { }


  getPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '5',
        page: ''+page
      }
    };
 
    return this.http.get<any[]>(`${this.url}posts&_embed`, options).pipe(
      map(resp => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');
 
        let data = resp['body'];
 
        for (let post of data) {
          try {
            post.media_url = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
          } catch(err) {
            post.media_url = 'https://dummyimage.com/291/194/e8f0f0/959e95&text=404'
          }
        }
        return data;
      })
    )
  }

  getPostContent(id) {
    return this.http.get(`${this.url}posts/${id}&_embed`).pipe(
      map(post => {
        try {
          post['media_url'] = post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
        } catch(err) {
          post['media_url'] = 'https://dummyimage.com/291/194/e8f0f0/959e95&text=404'
        }
        return post;
      })
    )
  }

}
