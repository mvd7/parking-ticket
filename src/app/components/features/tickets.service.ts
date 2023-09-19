import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  CollectionReference,
  DocumentData,
  where,
  query,
  getDocs,
  getDoc,
  updateDoc as firestoreUpdateDoc,
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Ticket } from 'src/app/interfaces/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  constructor(private readonly firestore: Firestore) {}

  getPostsByUserId(userId: string): Observable<Ticket[]> {
    const ticketsCollection = collection(this.firestore, 'tickets');
    const userPostsQuery = query(
      ticketsCollection,
      where('userId', '==', userId)
    );

    return collectionData(userPostsQuery, { idField: 'id' }) as Observable<
      Ticket[]
    >;
  }

  createTicket = async (ticket: Ticket, userId: string) => {
    try {
      const ticketsCollectionRef = collection(this.firestore, 'tickets');

      const price = ticket.price !== undefined ? ticket.price : 0;

      const ticketData = {
        licensePlate: ticket.licensePlate,
        location: ticket.location,
        hours: ticket.hours,
        price: price,
        dateAndTime: Timestamp.fromDate(new Date()),
        status: ticket.status,
        userId: userId,
      };

      const newTicketRef = await addDoc(ticketsCollectionRef, ticketData);

      return newTicketRef.id;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };

  payTicket = (ticketId: string) => {
    if (!ticketId) {
      console.log(`Id ${ticketId} not found.`);
      return Promise.reject(`Id ${ticketId} not found.`);
    }

    const docRef = doc(this.firestore, `tickets/${ticketId}`);

    return getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const ticketData = docSnapshot.data();
          if (ticketData?.['status'] === true) {
            console.log(`Ticket with ID ${ticketId} is already paid.`);
            return Promise.resolve();
          } else {
            const updatedTicket: Partial<Ticket> = {
              status: true,
            };
            return firestoreUpdateDoc(docRef, updatedTicket);
          }
        } else {
          console.log(`Ticket with ID ${ticketId} not found.`);
          return Promise.reject(`Ticket with ID ${ticketId} not found.`);
        }
      })
      .catch((error) => {
        console.error('Error updating ticket:', error);
        return Promise.reject('Error updating ticket');
      });
  };

  deleteTicket = (ticketId: string) => {
    const docRef = doc(this.firestore, `tickets/${ticketId}`);
    return from(deleteDoc(docRef));
  };
}
