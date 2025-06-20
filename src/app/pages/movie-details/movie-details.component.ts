import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { LanguageService } from '../../core/services/language.service';
import { combineLatest, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule,MovieCardComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
   private langService = inject(LanguageService);
  movie: any;
  recommendations: any[] = [];
  isLoading: boolean = true;
  currentLang: string = 'en';

ngOnInit(): void {
  combineLatest([
    this.route.paramMap,
    this.langService.language$
  ])
  .pipe(
    switchMap(([params, lang]: [ParamMap, string]) => {
      this.currentLang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      const id = Number(params.get('id'));
      this.isLoading = true;

      return forkJoin({
        movie: this.movieService.getMovieDetails(id),
        recommendations: this.movieService.getRecommendations(id)
      });
    })
  )
  .subscribe({
    next: ({ movie, recommendations }) => {
      this.movie = movie;
this.recommendations = recommendations.results.filter((movie: any) => movie.poster_path);
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error fetching data', err);
      this.isLoading = false;
    }
  });
 }

  fetchMovieDetails(id: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (res) => {
        this.movie = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching details', err);
        this.isLoading = false;
      }
    });
  }

  fetchRecommendations(id: number): void {
    this.movieService.getRecommendations(id).subscribe({
      next: (res) => {
      this.recommendations = res.results.filter((movie: any) => movie.poster_path);
      },
      error: (err) => {
        console.error('Error fetching recommendations', err);
      }
    });
  }
translations: any = {
  en: {
    releaseDate: 'Release Date:',
    overview: 'Overview:',
    rating: 'Rating:',
        recommended: '🎯 Recommended Movies'

  },
  ar: {
    releaseDate: 'تاريخ الإصدار:',
    overview: 'الملخص:',
    rating: 'التقييم:',
        recommended: '🎯 أفلام موصى بها'

  },
  fr: {
    releaseDate: 'Date de sortie :',
    overview: 'Résumé :',
    rating: 'Note :',
        recommended: '🎯 Films recommandés'

  },
  zh: {
    releaseDate: '发布日期：',
    overview: '概述：',
    rating: '评分：',
        recommended: '🎯 推荐电影'

  }
};


}
