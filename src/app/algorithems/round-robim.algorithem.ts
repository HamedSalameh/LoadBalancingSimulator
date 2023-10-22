import { Server } from '../models/server.model';
import { LoadBalancingAlgorithm } from './algorithem.interface';

export class RoundRobinAlgorithem implements LoadBalancingAlgorithm {
  id: number;
  name: string;
  description: string;
  roundRobinIndex: number = 0;

  constructor() {
    this.id = 1;
    this.name = 'Round Robin';
    this.description =
      'Round Robin is a load balancing algorithem that will select the next server in the list of servers in a round robin fashion.';
  }

  SelectNextServer(servers: Server[]): Server | undefined {
    if (servers.length === 0) {
      return undefined;
    }

    const selectedServer = servers[this.roundRobinIndex];
    this.roundRobinIndex = (this.roundRobinIndex + 1) % servers.length;
    return selectedServer;
  }
}
