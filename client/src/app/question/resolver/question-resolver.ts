import { Injectable } from '@angular/core';
import {QuestionService} from '../../core/services/question.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Question} from '../../shared/models/question-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<Question>{

  constructor(private questionService: QuestionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Question> {
    return this.questionService.loadQuestion(route.params.id);
  }
}
