import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '3366ee34025d63230390a8536e57ee18';

  constructor(
    private http: HttpClient,
    private langService: LanguageService
  ) {}

  getNowPlaying(page: number = 1): Observable<any> {
    const lang = this.langService.currentLanguage;
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${lang}&page=${page}`);
  }

  getMovieDetails(id: number): Observable<any> {
    const lang = this.langService.currentLanguage;
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${lang}`);
  }

  getRecommendations(id: number): Observable<any> {
    const lang = this.langService.currentLanguage;
    return this.http.get(`${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=${lang}`);
  }

  searchMovies(query: string): Observable<any> {
    const lang = this.langService.currentLanguage;
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${lang}&query=${query}`);
  }
}
