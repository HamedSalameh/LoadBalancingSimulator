import { Injectable } from '@angular/core';
import { Server } from '../models/server.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServersPoolService {
  // the list of all the servers in the application, will be subscribed to by the servers pool component
  private serverPool: Server[] = [];
  private serverPoolSubject: BehaviorSubject<Server[]> = new BehaviorSubject<Server[]>(this.serverPool);

  constructor() {
    this.serverPoolSubject.next(this.serverPool);
  }

  // Add a server to the pool
  addServer(server: Server) {
    this.serverPool.push(server);
    this.serverPoolSubject.next(this.serverPool);
  }

  // Remove a server from the pool
  removeServer(server: Server) {
    const index = this.serverPool.indexOf(server);
    if (index !== -1) {
      this.serverPool.splice(index, 1);
      this.serverPoolSubject.next(this.serverPool);
    }
  }

  // Get the current server pool as an observable
  getServerPool() {
    return this.serverPoolSubject.asObservable();
  }
}
