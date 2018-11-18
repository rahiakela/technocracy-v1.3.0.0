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

  loadCompanies(): Observable<any[]> {
    return this.httpClient.get('./assets/json-data/companies.json')
      .pipe(
        map((data: any) => {
          let companies: any[] = [];
          for(let i = 0; i < data.companies.length; i++){
            companies.push({name: data.companies[i]});
          }
          return companies;
        })
      );
  }

  loadDesignations(): Observable<any[]> {
    return this.httpClient.get('./assets/json-data/profession.json')
      .pipe(
        map((data: any) => {
          let designations: any[] = [];
          for(let i = 0; i < data.designations.length; i++){
            designations.push({name: data.designations[i]});
          }
          return designations;
        })
      );
  }
}
