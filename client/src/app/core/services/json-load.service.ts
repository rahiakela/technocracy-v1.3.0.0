import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonLoadService {

  constructor(private httpClient: HttpClient) { }

  loadCountries(): Observable<any[]> {
    return this.httpClient.get('./assets/json-data/countries.json')
      .pipe(
        map((data: any[]) => {
          let countries: any[] = [];
          for(let i = 0; i < data.length; i++){
            countries.push({name: data[i].name, url: data[i].file_url});
          }
          return countries;
        })
      );
  }

  loadCities(): Observable<any[]> {
    return this.httpClient.get('./assets/json-data/cities.json')
      .pipe(
        map((data: any[]) => {
          let cities: any[] = [];
          for(let i = 0; i < data.length; i++){
            cities.push({name: data[i].city});
          }
          return cities;
        })
      );
  }
}
