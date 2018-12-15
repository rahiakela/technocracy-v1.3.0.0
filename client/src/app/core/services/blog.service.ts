import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Blog} from '../../shared/models/blog-model';
import {Observable} from 'rxjs';
import {UtilService} from './util.service';
import {Comment, Reply} from '../../shared/models/comment-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  REST_URL = environment.REST_URL;

  constructor(private http: HttpClient, public utilService: UtilService) { }

  getBlogs(page: number): Observable<Blog[]> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/${page}`);
  }

  loadBlog(blogId: string): Observable<Blog> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/${blogId}/load`);
  }

  loadBlogListWrittenByAuthor(writtenBy: string): Observable<any> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/all/${writtenBy}`);
  }

  loadPendingBlogList(): Observable<any> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/all/pending/list`);
  }

  addBlog(blog: any): Observable<Blog> {
    return this.sendRequest('POST', `${this.REST_URL}/blog/${blog.profileId}/${blog.action}`, blog);
  }

  modifyBlog(blogId: string, actionType: string): Observable<Blog> {
    return this.sendRequest('PUT', `${this.REST_URL}/blog/${blogId}/${actionType}`, '');
  }

  editBlog(blogId: string, blog: Blog): Observable<Blog> {
    return this.sendRequest('PUT', `${this.REST_URL}/blog/${blogId}`, blog);
  }

  deleteBlog(blogId: string): Observable<Blog> {
    return this.sendRequest('DELETE', `${this.REST_URL}/blog/${blogId}`, '');
  }

  publishBlog(blog: Blog, profileId: string, actionType: string): Observable<Blog> {
    return this.sendRequest('POST', `${this.REST_URL}/blog/${profileId}/${actionType}`, blog);
  }

  searchBlog(query: string): Observable<Blog[]> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/search/${query}`);
  }

  getRelatedBlog(title: string): Observable<Blog[]> {
    return this.sendRequest('PUT', `${this.REST_URL}/blog/predict/classification`, {title: title});
  }

  like(blogId: string, likedBy: string): Observable<Blog> {
    return this.sendRequest('GET', `${this.REST_URL}/blog/${blogId}/like/${likedBy}`);
  }

  addComment(blogId: string, commentedBy: string, content: string, notification: boolean): Observable<Blog> {
    return this.sendRequest('POST', `${this.REST_URL}/comment/blog/${blogId}/${commentedBy}`, {content: content, notification: notification});
  }

  likeComment(commentId: string, likedBy: string): Observable<Comment> {
    return this.sendRequest('GET', `${this.REST_URL}/comment/like/${commentId}/${likedBy}`);
  }

  addReply(blogId: string, commentId: string, userId: string, content: string): Observable<Comment> {
    return this.sendRequest('POST', `${this.REST_URL}/comment/reply`, {
      'repliedFor': 'blog',
      'repliedForId': blogId,
      'commentId': commentId,
      'repliedBy': userId,
      'content': content
    });
  }

  likeReply(replyId: string, likedBy: string): Observable<Reply> {
    return this.sendRequest('GET', `${this.REST_URL}/comment/reply/like/${replyId}/${likedBy}`);
  }

  editCommentReply(actionId: string, actionType: string, content: string): Observable<Comment> {
    return this.sendRequest('PUT', `${this.REST_URL}/comment/${actionId}`, {
      actionType: actionType,
      content: content
    });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.sendRequest('DELETE', `${this.REST_URL}/comment/${commentId}`);
  }

  deleteReply(replyId: string): Observable<any> {
    return this.sendRequest('DELETE', `${this.REST_URL}/comment/reply/${replyId}`);
  }

  private sendRequest(verb: string, url: string, body?: any, params?: any): Observable<any> {

    let headers = null;
    // add JWT token with request headers
    const authToken = this.utilService.getAuthToken();
    if (authToken) {
      headers = new HttpHeaders({ 'x-access-token': authToken, 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    }

    return this.http.request(verb, url, {
      headers: headers,
      body: body,
      responseType: 'json',
      params: new HttpParams({fromString: params})
    });
      // .catch((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`));
  }
}
