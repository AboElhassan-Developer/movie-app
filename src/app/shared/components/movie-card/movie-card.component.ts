import { Component, Input, OnInit } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common'; // ✅ أضف CommonModule

import { Movie } from '../../../core/services/models/movie.model';
import { WishlistService } from '../../../core/services/wishlist.service';
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass, CommonModule], // ✅ أضف CommonModule هنا
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  isInWishlist: boolean = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.isInWishlist = this.wishlistService.isInWishlist(this.movie.id);
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.movie.id);
    } else {
      this.wishlistService.addToWishlist(this.movie);
    }
    this.isInWishlist = !this.isInWishlist;
  }
}
