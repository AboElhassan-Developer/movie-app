import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [

 { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'search/:query', component: SearchResultsComponent },
  { path: '**', redirectTo: '' }

];
