import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'onsu';

  searchText: string = '';
  isFocused: boolean = false;

  constructor(private router: Router) {}
  
  clearSearch() {
    this.searchText = ''; 
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }  
  
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  
  goToHome() {
    this.router.navigate(['']);
  }  
  
  onSelect(option: string) {
    console.log('User clicked:', option);
    // … add any navigation or logic here …
  }
}
