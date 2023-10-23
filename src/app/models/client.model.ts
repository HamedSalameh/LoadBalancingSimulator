import { LoadBalancer } from './load-balancer.model';
import { ServerStatus } from './types';

export class Client {
  name: string;
  address: string;
  status: ServerStatus = ServerStatus.idle; 

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  async sendRequest(activeLoadBalancer: LoadBalancer) {
    this.status = ServerStatus.busy;
    await new Promise((r) => setTimeout(r, 25));
    activeLoadBalancer.handleRequest( [this] );
    this.status = ServerStatus.idle;
  }
}
