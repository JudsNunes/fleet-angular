import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../config/environment';
import { PageableResponse, PageParams, DEFAULT_PAGE_PARAMS } from '../models/pagination.models';

@Injectable()
export abstract class ApiBaseService<TResponse, TRequest = Partial<TResponse>> {
  protected abstract readonly basePath: string;

  protected readonly http = inject(HttpClient);
  protected readonly env = inject(ENVIRONMENT);

  protected get baseUrl(): string {
    return `${this.env.apiUrl}/${this.basePath}`;
  }

  getAll(params?: Record<string, string>): Observable<TResponse[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.set(key, value);
      });
    }
    return this.http.get<TResponse[]>(this.baseUrl, { params: httpParams });
  }

  getPage(pageParams: PageParams = DEFAULT_PAGE_PARAMS, filters?: Record<string, string>): Observable<PageableResponse<TResponse>> {
    let httpParams = new HttpParams()
      .set('page', pageParams.page.toString())
      .set('size', pageParams.size.toString());

    if (pageParams.sort) {
      httpParams = httpParams.set('sort', `${pageParams.sort},${pageParams.direction ?? 'ASC'}`);
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    return this.http.get<PageableResponse<TResponse>>(this.baseUrl, { params: httpParams });
  }

  getById(id: string): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.baseUrl}/${id}`);
  }

  create(body: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(this.baseUrl, body);
  }

  update(id: string, body: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.baseUrl}/${id}`, body);
  }

  patch(id: string, body: Partial<TRequest>): Observable<TResponse> {
    return this.http.patch<TResponse>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
