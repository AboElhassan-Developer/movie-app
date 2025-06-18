import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);

  movies: any[] = [];
  isLoading: boolean = true;
  page: number = 1;

  ngOnInit(): void {
    this.fetchNowPlaying();
  }

  fetchNowPlaying(): void {
    this.isLoading = true;

    this.movieService.getNowPlaying(this.page).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching movies', err);
        this.isLoading = false;
      }
    });
  }

  nextPage(): void {
    this.page++;
    this.fetchNowPlaying();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchNowPlaying();
    }
  }
}
