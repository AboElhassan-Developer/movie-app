import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  constructor() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(savedLang); // Set initial language
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.languageSubject.next(lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Set RTL or LTR
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  get currentLanguage(): string {
    return this.languageSubject.value;
  }
}
