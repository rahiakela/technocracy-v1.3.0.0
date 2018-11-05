import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Question} from '../../shared/models/question-model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Comment, Reply} from "../../shared/models/comment-model";
import {UtilService} from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  REST_URL = environment.REST_URL;

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getQuestions(page: number): Observable<Question[]> {
    return this.sendRequest('GET', `${this.REST_URL}/question/${page}`);
  }

  loadQuestion(questionId: string): Observable<Question> {
    return this.sendRequest('GET', `${this.REST_URL}/question/${questionId}/load`);
  }

  loadQuestionListAskedByUser(askedBy: string): Observable<any> {
    return this.sendRequest('GET', `${this.REST_URL}/question/all/${askedBy}`);
  }

  addQuestion(question: any): Observable<Question> {
    return this.sendRequest('POST', `${this.REST_URL}/question/${question.askedBy}/${question.actionType}`, question);
  }

  modifyQuestion(questionId: string, actionType: string): Observable<Question> {
    return this.sendRequest('PUT', `${this.REST_URL}/question/${questionId}/${actionType}`, '');
  }

  editQuestion(question: Question, questionId: string): Observable<Question> {
    return this.sendRequest('PUT', `${this.REST_URL}/question/${questionId}`, question);
  }

  deleteQuestion(questionId: string): Observable<Question> {
    return this.sendRequest('DELETE', `${this.REST_URL}/question/${questionId}`, '');
  }

  publishQuestion(question: Question, profileId: string, actionType: string): Observable<Question> {
    return this.sendRequest('POST', `${this.REST_URL}/question/${profileId}/${actionType}`, question);
  }

  like(questionId: string, likedBy: string): Observable<Question> {
    return this.sendRequest('GET', `${this.REST_URL}/question/${questionId}/like/${likedBy}`);
  }

  addComment(questionId: string, commentedBy: string, content: string, notification: boolean): Observable<Question> {
    return this.sendRequest('POST', `${this.REST_URL}/comment/question/${questionId}/${commentedBy}`, {content: content, notification: notification});
  }

  likeComment(commentId: string, likedBy: string): Observable<Comment> {
    return this.sendRequest('GET', `${this.REST_URL}/comment/like/${commentId}/${likedBy}`);
  }

  addReply(questionId: string, commentId: string, userId: string, content: string): Observable<Comment> {
    return this.sendRequest('POST', `${this.REST_URL}/comment/reply`, {
      'repliedFor': 'question',
      'repliedForId': questionId,
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
      headers = new HttpHeaders({ 'x-access-token': authToken, 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' })
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' })
    }

    return this.http.request(verb, url, {
      headers: headers,
      body: body,
      responseType: "json",
      params: new HttpParams({fromString: params})
    });
    // .catch((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`));
  }
}
