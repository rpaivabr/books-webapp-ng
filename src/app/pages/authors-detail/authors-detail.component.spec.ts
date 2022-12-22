import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDetailComponent } from './authors-detail.component';

describe('AuthorsDetailComponent', () => {
  let component: AuthorsDetailComponent;
  let fixture: ComponentFixture<AuthorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
