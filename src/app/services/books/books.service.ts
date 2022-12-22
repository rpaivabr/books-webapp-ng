import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  constructor(private httpClient: HttpClient) {}

  listAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('http://localhost:3000/books');
  }

  getBookById(id: string): Observable<Book> {
    return this.httpClient.get<Book>(`http://localhost:3000/books/${id}`);
  }

  createBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.httpClient.post<Book>('http://localhost:3000/books', book);
  }

  updateBook(book: Book): Observable<Book> {
    const { id, ...body } = book;
    return this.httpClient.put<Book>(`http://localhost:3000/books/${id}`, body);
  }

  deleteBook(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/books/${id}`);
  }
}
