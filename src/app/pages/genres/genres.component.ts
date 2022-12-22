import { Component } from '@angular/core';
import { Genre } from 'src/app/models';
import { GenresService } from 'src/app/services';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {
  genres: Genre[] = [];

  constructor(private genresService: GenresService) {}

  ngOnInit(): void {
    this.genresService.listAllGenres().subscribe((genres) => (this.genres = genres));
  }
}
