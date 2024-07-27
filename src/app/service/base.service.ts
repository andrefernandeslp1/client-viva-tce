// base.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected httpClient: HttpClient;
  protected apiUrl: string;

  constructor(httpClient: HttpClient, apiUrl: string) {
    this.httpClient = httpClient;
    this.apiUrl = apiUrl;
  }

  list(): Observable<T[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.get<T[]>(this.apiUrl, { headers });
  }

  getOne(id: number): Observable<T> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`, { headers });
  }

  create(item: T): Observable<T> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.post<T>(this.apiUrl, item, { headers });
  }

  update(id: any, item: T): Observable<T> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.put<T>(`${this.apiUrl}/${id}`, item, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers });
  }


}
