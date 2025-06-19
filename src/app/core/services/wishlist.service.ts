import { Injectable } from '@angular/core';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private storageKey = 'wishlist_movies';
  private wishlist: Movie[] = [];

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const stored = localStorage.getItem(this.storageKey);
    this.wishlist = stored ? JSON.parse(stored) : [];
  }

  private saveWishlist(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
  }

  getWishlist(): Movie[] {
    return [...this.wishlist];
  }

  addToWishlist(movie: Movie): void {
    if (!this.isInWishlist(movie.id)) {
      this.wishlist.push(movie);
      this.saveWishlist();
    }
  }

  removeFromWishlist(id: number): void {
    this.wishlist = this.wishlist.filter(m => m.id !== id);
    this.saveWishlist();
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.some(m => m.id === id);
  }
}
