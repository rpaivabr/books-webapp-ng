import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) {}

  listAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>('http://localhost:3000/authors');
  }

  getAuthorById(id: string): Observable<Author> {
    return this.httpClient.get<Author>(`http://localhost:3000/authors/${id}`);
  }

  createAuthor(author: Omit<Author, 'id'>): Observable<Author> {
    return this.httpClient.post<Author>('http://localhost:3000/authors', author);
  }

  updateAuthor(author: Author): Observable<Author> {
    const { id, ...body } = author;
    return this.httpClient.put<Author>(`http://localhost:3000/authors/${id}`, body);
  }

  deleteAuthor(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/authors/${id}`);
  }
}
