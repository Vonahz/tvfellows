import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() message: string = 'There was an error. Please try again later.';
  constructor() { }

  ngOnInit() {
  }

}
