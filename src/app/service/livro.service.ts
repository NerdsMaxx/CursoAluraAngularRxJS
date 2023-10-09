import { Item, LivrosResultado } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscar(livro: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', livro);
    
    return this.http.get<LivrosResultado>(this.API, { params });
  }
}