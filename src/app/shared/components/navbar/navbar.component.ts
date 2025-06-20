import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  wishlistCount: number = 0;
  currentLang: string = 'en';

  private wishlistService = inject(WishlistService);
  private langService = inject(LanguageService);
  private router = inject(Router);

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(list => {
      this.wishlistCount = list.length;
    });

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  changeLanguage(lang: string) {
    this.langService.setLanguage(lang);
  }

 onSearch(query: string) {
  const trimmed = query.trim();
  if (trimmed.length > 0) {
    this.router.navigate(['/search', trimmed]);
  }
  else {
    this.router.navigate(['/']);
  }
}
translations: any = {
  en: {
    brand: 'MovieApp',
    searchPlaceholder: 'Search...',
    wishlist: 'Wishlist',
    language: 'Language',
    en: 'English',
    ar: 'Arabic',
    fr: 'French',
    zh: 'Chinese'
  },
  ar: {
        brand: 'تطبيق الأفلام',

    searchPlaceholder: 'ابحث...',
    wishlist: 'المفضلة',
    language: 'اللغة',
    en: 'الإنجليزية',
    ar: 'العربية',
    fr: 'الفرنسية',
    zh: 'الصينية'
  },
  fr: {
        brand: 'AppliFilms',

    searchPlaceholder: 'Rechercher...',
    wishlist: 'Favoris',
    language: 'Langue',
    en: 'Anglais',
    ar: 'Arabe',
    fr: 'Français',
    zh: 'Chinois'
  },
  zh: {
        brand: '电影应用',

    searchPlaceholder: '搜索...',
    wishlist: '愿望清单',
    language: '语言',
    en: '英语',
    ar: '阿拉伯语',
    fr: '法语',
    zh: '中文'
  }
};

}
