import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsDetailComponent } from './pages/authors-detail/authors-detail.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BooksDetailComponent } from './pages/books-detail/books-detail.component';
import { BooksComponent } from './pages/books/books.component';
import { GenresDetailComponent } from './pages/genres-detail/genres-detail.component';
import { GenresComponent } from './pages/genres/genres.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BooksDetailComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/:id', component: AuthorsDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:id', component: GenresDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
