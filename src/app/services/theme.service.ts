import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  date: Date = new Date();
  today: string;
  constructor() {
    this.today = this.date.toDateString().slice(3);
  }
}
