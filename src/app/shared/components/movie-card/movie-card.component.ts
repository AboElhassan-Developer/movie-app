import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
@Input() movie: any;
@Input() translations: any;
@Input() currentLang: string = 'en';

constructor(public wishlistService: WishlistService) {}

  toggleWishlist() {
    this.wishlistService.toggle(this.movie);
  }

  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.movie);
  }
}
