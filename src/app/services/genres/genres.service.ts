import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  constructor(private httpClient: HttpClient) {}

  listAllGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>('http://localhost:3000/genres');
  }

  getGenreById(id: string): Observable<Genre> {
    return this.httpClient.get<Genre>(`http://localhost:3000/genres/${id}`);
  }

  createGenre(genre: Omit<Genre, 'id'>): Observable<Genre> {
    return this.httpClient.post<Genre>('http://localhost:3000/genres', genre);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    const { id, ...body } = genre;
    return this.httpClient.put<Genre>(`http://localhost:3000/genres/${id}`, body);
  }

  deleteGenre(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/genres/${id}`);
  }
}
