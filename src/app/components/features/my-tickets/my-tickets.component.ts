import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locations, Ticket } from 'src/app/interfaces/ticket.interface';
import { TicketsService } from '../tickets.service';
import { AuthService } from '../../auth/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class MyTicketsComponent implements OnInit {
  isModalOpen: boolean = false;

  locations = Object.values(Locations);

  ticketForm: FormGroup;

  currentUser: string | undefined;

  userTickets: Ticket[];

  payNowModal: boolean = false;

  locationPrices: { [key in Locations]: number } = {
    [Locations.ParkingLocation1]: 5,
    [Locations.ParkingLocation2]: 6,
    [Locations.ParkingLocation3]: 4,
    [Locations.ParkingLocation4]: 7,
    [Locations.ParkingLocation5]: 8,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly ticketsService: TicketsService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      licensePlate: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
        ],
      ],
      hours: [1, [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required]],
    });

    console.log(this.ticketForm);

    this.authService.loggedUser$.subscribe((user) => {
      this.currentUser = user?.uid;
    });

    if (this.currentUser !== undefined) {
      this.ticketsService
        .getPostsByUserId(this.currentUser)
        .subscribe((tickets) => {
          console.log(tickets);
          this.userTickets = tickets;
        });
    }
  }

  addTicket() {
    if (this.ticketForm.valid && this.currentUser !== undefined) {
      const selectedLocation = this.ticketForm.value.location as Locations;
      const hours = this.ticketForm.value.hours;
      console.log(this.ticketForm);
      const pricePerHour = this.locationPrices[selectedLocation];

      const totalPrice = pricePerHour * hours;

      const newTicket: Ticket = {
        id: '',
        ...this.ticketForm.value,
        dateAndTime: new Date(),
        status: false,
        price: totalPrice,
      };

      this.ticketsService
        .createTicket(newTicket, this.currentUser)
        .then((ticketId) => {
          this.ticketForm.reset();
          this.closeModal();
        })
        .catch((error) => {
          console.log('Error Adding ticket', error);
        });
    }
  }

  onClickPay = (ticketId: string) => {
    try {
      this.ticketsService.payTicket(ticketId);
    } catch (error) {
      console.log(error);
    }
  };

  onClickDelete = (ticketId: string) => {
    try {
      this.ticketsService.deleteTicket(ticketId);
    } catch (error) {
      console.log(error);
    }
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  payNowModalOpen() {
    this.payNowModal = true;
  }

  payNowModalClose() {
    this.payNowModal = false;
  }
}
