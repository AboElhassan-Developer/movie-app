import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../../../src/app/shared/components/movie-card/movie-card.component';
import { WishlistService } from '../../../../src/app/core/services/wishlist.service';
import { Movie } from '../../../../src/app/core/services/models/movie.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Movie[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }
}
