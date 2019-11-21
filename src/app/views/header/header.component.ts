import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  inputValue: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(): void {
    this.router.navigate(['/tv/search', this.inputValue]);
  }

  onKeydown(event): void {
    if (event.key === "Enter") {
      this.search();
    }
  }
}
