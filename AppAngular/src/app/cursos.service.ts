import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from './Curso';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  url = 'https://localhost:5001/api/cursos';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  PegarPeloId(cursoId: number): Observable<Curso> {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.get<Curso>(apiUrl);
  }

  SalvarCurso(curso: Curso): Observable<any> {
    return this.http.post<Curso>(this.url, curso, httpOptions);
  }

  AtualizarCurso(curso: Curso): Observable<any> {
    return this.http.put<Curso>(this.url, curso, httpOptions);
  }

  ExcluirCurso(cursoId: number): Observable<any> {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
