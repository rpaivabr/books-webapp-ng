import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, Book, Genre } from 'src/app/models';
import { AuthorsService, BooksService, GenresService } from 'src/app/services';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.scss'],
})
export class BooksDetailComponent {
  bookId!: string;
  authors: Author[] = [];
  genres: Genre[] = [];
  bookForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    isbn: ['', Validators.required],
    year: ['', Validators.required],
    authorId: ['', Validators.required],
    genreId: ['', Validators.required],
  });

  get titleControl(): FormControl {
    return this.bookForm.controls['title'] as FormControl;
  }

  get isbnControl(): FormControl {
    return this.bookForm.controls['isbn'] as FormControl;
  }

  get yearControl(): FormControl {
    return this.bookForm.controls['year'] as FormControl;
  }

  get authorIdControl(): FormControl {
    return this.bookForm.controls['authorId'] as FormControl;
  }

  get genreIdControl(): FormControl {
    return this.bookForm.controls['genreId'] as FormControl;
  }

  get isEdit(): boolean {
    return Boolean(this.bookId);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'new') {
        this.booksService.getBookById(id).subscribe((book) => {
          this.bookId = book?.id as string;
          this.bookForm.patchValue({
            title: book?.title || '',
            isbn: book?.isbn || '',
            year: book?.year || '',
            authorId: book?.author.id || '',
            genreId: book?.genre.id || '',
          });
        });
      }
    });

    this.authorsService
      .listAllAuthors()
      .subscribe((authors) => (this.authors = authors));
    this.genresService
      .listAllGenres()
      .subscribe((genres) => (this.genres = genres));
  }

  saveBook(): void {
    const book = this.bookForm.value as Book;

    if (this.isEdit) {
      book['id'] = this.bookId;
      this.booksService.updateBook(book).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    } else {
      this.booksService.createBook(book).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    }
  }

  deleteBook(): void {
    this.booksService.deleteBook(this.bookId).subscribe(() => {
      this.router.navigateByUrl('/books');
    });
  }
}
