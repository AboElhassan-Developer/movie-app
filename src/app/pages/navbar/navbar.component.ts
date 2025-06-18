import { Component } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentLang = 'en'; 

constructor(private langService: LanguageService) {
  this.langService.language$.subscribe(lang => {
    this.currentLang = lang;
  });
}

  changeLanguage(lang: string) {
    this.langService.setLanguage(lang);
  }

}
