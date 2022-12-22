import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/models';
import { GenresService } from 'src/app/services';

@Component({
  selector: 'app-genres-detail',
  templateUrl: './genres-detail.component.html',
  styleUrls: ['./genres-detail.component.scss'],
})
export class GenresDetailComponent implements OnInit {
  genreId!: string;
  genreForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  get nameControl(): FormControl {
    return this.genreForm.controls['name'] as FormControl;
  }

  get isEdit(): boolean {
    return Boolean(this.genreId);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'new') {
        this.genresService.getGenreById(id).subscribe((genre) => {
          this.genreId = genre?.id as string;
          this.genreForm.patchValue({ name: genre?.name || '' });
        });
      }
    });
  }

  saveGenre(): void {
    const genre = this.genreForm.value as Genre;

    if (this.isEdit) {
      genre['id'] = this.genreId;
      this.genresService.updateGenre(genre).subscribe(() => {
        this.router.navigateByUrl('/genres');
      });
    } else {
      this.genresService.createGenre(genre).subscribe(() => {
        this.router.navigateByUrl('/genres');
      });
    }
  }

  deleteGenre(): void {
    this.genresService.deleteGenre(this.genreId).subscribe(() => {
      this.router.navigateByUrl('/genres');
    });
  }
}
