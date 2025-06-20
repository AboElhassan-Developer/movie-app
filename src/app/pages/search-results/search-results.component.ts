import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { MovieService } from '../../core/services/movie.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private langService = inject(LanguageService);

  currentLang: string = 'en';
  movies: any[] = [];
  isLoading = true;

  translations: any = {
    en: { title: 'Search Results', noResults: 'No results found' },
    ar: { title: 'نتائج البحث', noResults: 'لا توجد نتائج' },
    fr: { title: 'Résultats de la recherche', noResults: 'Aucun résultat trouvé' },
    zh: { title: '搜索结果', noResults: '未找到结果' }
  };

  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const query = params.get('query') || '';
      if (query) {
        this.searchMovies(query);
      }
    });
  }

  searchMovies(query: string) {
    this.isLoading = true;
    this.movieService.searchMovies(query).subscribe({
      next: (res: any) => {
        this.movies = res.results.filter((movie: any) => movie.poster_path);
        this.isLoading = false;
      },
      error: () => {
        this.movies = [];
        this.isLoading = false;
      }
    });
  }
}
