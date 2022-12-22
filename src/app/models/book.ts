import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
  id: string;
  title: string;
  isbn: string;
  authorId: string;
  genreId: string;
  author: Author;
  genre: Genre;
  amount: number;
  year: number;
}
