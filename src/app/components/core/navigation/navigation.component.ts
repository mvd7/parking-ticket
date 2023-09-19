import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavigationComponent implements OnInit {
  isMenuOpen = false;

  constructor(private readonly authService: AuthService) {}

  currentUser = false;

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((user) => {
      // console.log(user?.uid);
      this.currentUser = !!user;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onClickLogout() {
    this.authService.logout();
  }
}
