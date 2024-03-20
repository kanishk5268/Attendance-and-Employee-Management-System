import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  today: string;
  shift: string = '9:00 AM to 5:00 PM'
  shiftDropdown: boolean = false
  constructor(private service: ThemeService) {
    this.today = this.service.today;
  }
  changeShift(val: string): void {
    this.shift = val
    this.toggleShifDropdown()
  }
  toggleShifDropdown(): void{
    this.shiftDropdown = !this.shiftDropdown
  }
}
