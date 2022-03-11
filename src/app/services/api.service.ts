import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../models/response.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  getCharacters(page: number): Observable<any> {
    return this._http.get(`${environment.apiUrl}character?page=${page}`);
  }
}
