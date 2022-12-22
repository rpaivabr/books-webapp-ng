import { Component } from '@angular/core';
import { Author } from 'src/app/models';
import { AuthorsService } from 'src/app/services';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  authors: Author[] = [];

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.listAllAuthors().subscribe((authors) => (this.authors = authors));
  }
}
