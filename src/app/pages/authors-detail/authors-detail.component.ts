import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models';
import { AuthorsService } from 'src/app/services';

@Component({
  selector: 'app-authors-detail',
  templateUrl: './authors-detail.component.html',
  styleUrls: ['./authors-detail.component.scss'],
})
export class AuthorsDetailComponent implements OnInit {
  authorId!: string;
  authorForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  get nameControl(): FormControl {
    return this.authorForm.controls['name'] as FormControl;
  }

  get isEdit(): boolean {
    return Boolean(this.authorId);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id !== 'new') {
        this.authorsService.getAuthorById(id).subscribe((author) => {
          this.authorId = author?.id as string;
          this.authorForm.patchValue({ name: author?.name || '' });
        });
      }
    });
  }

  saveAuthor(): void {
    const author = this.authorForm.value as Author;

    if (this.isEdit) {
      author['id'] = this.authorId;
      this.authorsService.updateAuthor(author).subscribe(() => {
        this.router.navigateByUrl('/authors');
      });
    } else {
      this.authorsService.createAuthor(author).subscribe(() => {
        this.router.navigateByUrl('/authors');
      });
    }
  }

  deleteAuthor(): void {
    this.authorsService.deleteAuthor(this.authorId).subscribe(() => {
      this.router.navigateByUrl('/authors');
    });
  }
}
