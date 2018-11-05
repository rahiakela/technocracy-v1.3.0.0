import { Injectable } from '@angular/core';
import {BlogService} from '../../core/services/blog.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Blog} from '../../shared/models/blog-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<Blog>{

  constructor(private blogService: BlogService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Blog> {
    return this.blogService.loadBlog(route.params.id);
  }
}
