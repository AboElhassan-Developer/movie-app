import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private key = 'wishlist';
  private wishlist: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');
  private wishlistSubject = new BehaviorSubject<any[]>(this.wishlist);

  wishlist$ = this.wishlistSubject.asObservable();

  getWishlist() {
    return this.wishlist;
  }

  isInWishlist(movie: any): boolean {
    return this.wishlist.some(item => item.id === movie.id);
  }

  add(movie: any) {
    if (!this.isInWishlist(movie)) {
      this.wishlist.push(movie);
      this.updateStorage();
    }
  }

  remove(movie: any) {
    this.wishlist = this.wishlist.filter(item => item.id !== movie.id);
    this.updateStorage();
  }

  toggle(movie: any) {
    this.isInWishlist(movie) ? this.remove(movie) : this.add(movie);
  }

  private updateStorage() {
    localStorage.setItem(this.key, JSON.stringify(this.wishlist));
    this.wishlistSubject.next(this.wishlist);
  }
}
