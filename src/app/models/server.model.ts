import { ServerStatus } from './types';

// a class representing a server
export class Server {
  name: string;
  status: ServerStatus; // idle, busy, offline
  weight: number;
  address: string;
  connections: number = 0;
  responseTime: number = 100; // in milliseconds

  constructor(
    name: string,
    status: ServerStatus,
    weight: number,
    address: string,
    responseTime: number = 100
  ) {
    this.name = name;
    this.status = status;
    this.weight = weight;
    this.address = address;
    this.responseTime = responseTime;
  }

  setServerStatus(status: ServerStatus) {
    this.status = status;
  }

  // return a string representation of the server
  toString(): string {
    return `Server: ${this.name} | Status: ${this.status} | Weight: ${this.weight} | Address: ${this.address}`;
  }

  // public methods
  handleRequest() {
    // simulate processing a request
    this.status = ServerStatus.busy;
    this.connections++;
    setTimeout(() => {
        this.connections--;
        if (this.connections === 0) {
        this.status = ServerStatus.idle;
      }
    }, 500 + this.responseTime);
  }

  // return the server's weight
  getWeight(): number {
    return this.weight;
  }
}
