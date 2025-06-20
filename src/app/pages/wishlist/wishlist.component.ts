import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { LanguageService } from '../../core/services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistService = inject(WishlistService);
  langService = inject(LanguageService);

  currentLang: string = 'en';

  translations: any = {
    en: { title: '💖 Your Wishlist', empty: '🚫 Your wishlist is empty' },
    ar: { title: '💖 قائمتك المفضلة', empty: '🚫 قائمتك المفضلة فارغة' },
    fr: { title: '💖 Votre liste de souhaits', empty: '🚫 Votre liste est vide' },
    zh: { title: '💖 愿望清单', empty: '🚫 您的愿望清单为空' }
  };

  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  get movies() {
    return this.wishlistService.getWishlist();
  }

  remove(movie: any) {
    this.wishlistService.remove(movie);
  }
}
