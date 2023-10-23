import { Server } from "../models/server.model";
import { LoadBalancingAlgorithm } from "./algorithem.interface";

export class LeastConnectionsLoadBalancingAlgorithm implements LoadBalancingAlgorithm {
  id: number;
  name: string;
  description: string;

  constructor() {
    this.id = 3;
    this.name = 'Least Connections';
    this.description =
      'Least Connections is a load balancing algorithem that will select the server with the least connections.';
  }

  SelectNextServer(servers: Server[]): Server | undefined {
    if (servers.length === 0) {
      return undefined;
    }

    let selectedServer = servers[0];
    for (let i = 1; i < servers.length; i++) {
      if (servers[i].connections < selectedServer.connections) {
        selectedServer = servers[i];
      }
    }

    return selectedServer;
  }
}
