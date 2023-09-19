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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  currentUser = false;
  userUsername: string | null | undefined;

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe((user) => {
      this.userUsername = user?.displayName;
      this.currentUser = !!user;
    });
  }
}
