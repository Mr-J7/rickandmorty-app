import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getCharacters(page:number): Observable<Object>{
    // return this._http.get(environment.apiUrl + 'character' + '?page=5')
    return this._http.get(`${environment.apiUrl}character?page=${page}`)
  }

}
