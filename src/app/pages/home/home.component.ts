import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  private langService = inject(LanguageService);

  movies: any[] = [];
  isLoading: boolean = true;
  page: number = 1;
  currentLang: string = 'en';

  translations: any = {
    en: {
      nowPlaying: '🎬 Now Playing',
      releaseDate: 'Release Date:',
      previous: '⬅ Previous',
      next: 'Next ➡',
      page: 'Page'
    },
    ar: {
      nowPlaying: '🎬 يُعرض الآن',
      releaseDate: 'تاريخ الإصدار:',
      previous: '⬅ السابق',
      next: 'التالي ➡',
      page: 'الصفحة'
    },
    fr: {
      nowPlaying: '🎬 En Salle',
      releaseDate: 'Date de sortie :',
      previous: '⬅ Précédent',
      next: 'Suivant ➡',
      page: 'Page'
    },
    zh: {
      nowPlaying: '🎬 正在上映',
      releaseDate: '发布日期：',
      previous: '⬅ 上一页',
      next: '下一页 ➡',
      page: '页码'
    }
  };

  ngOnInit(): void {
  this.langService.language$.subscribe(lang => {
    this.currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.fetchNowPlaying();
  });
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
