import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsPoolService {

  private clientsPool: Client[] = [];
  private clientsPoolSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(this.clientsPool);

  constructor() { 
    this.clientsPoolSubject.next(this.clientsPool);
  }

  addClient(client: Client) {
    this.clientsPool.push(client);
    this.clientsPoolSubject.next(this.clientsPool);
  }

  removeClient(client: Client) {
    const index = this.clientsPool.indexOf(client);
    if (index !== -1) {
      this.clientsPool.splice(index, 1);
      this.clientsPoolSubject.next(this.clientsPool);
    }
  }

  getClientsPool() {
    return this.clientsPoolSubject.asObservable();
  }
}
