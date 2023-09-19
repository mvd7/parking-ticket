import { Timestamp } from '@firebase/firestore';

export enum Locations {
  ParkingLocation1 = 'Parking Lot A',
  ParkingLocation2 = 'Parking Garage B',
  ParkingLocation3 = 'Street Parking C',
  ParkingLocation4 = 'Parking Deck D',
  ParkingLocation5 = 'Parking Structure E',
}

export interface Ticket {
  id: string;
  licensePlate: string;
  location: Locations;
  hours: number;
  price: number;
  dateAndTime: Timestamp;
  status: boolean;
}
