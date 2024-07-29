// base.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected httpClient: HttpClient;
  protected apiUrl: string = 'http://localhost:5201/';

  constructor(httpClient: HttpClient, apiPath: string) {
    this.httpClient = httpClient;
    this.apiUrl += apiPath
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

  filterByNome(nome: string): Observable<T[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('jwt-token'));
    let url = `${this.apiUrl}/filter/nome/pagination?nome=${nome}`
    if(nome.length !== 0){
      return this.httpClient.get<T[]>(url, {headers})
    }
    return this.list()
    
  }

}
