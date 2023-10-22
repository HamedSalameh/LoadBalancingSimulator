import { Server } from "../models/server.model";

export class LeastResponseTimeAlgorithm implements Algorithm {
  id: number;
  name: string;
  description: string;

  constructor() {
    this.id = 4;
    this.name = 'Least Response Time';
    this.description =
      'Least Response Time is a load balancing algorithem that will select the server with the least response time.';
  }

  SelectNextServer(servers: Server[]): Server | undefined {
    if (servers.length === 0) {
      return undefined;
    }

    let selectedServer = servers[0];
    for (let i = 1; i < servers.length; i++) {
      if (servers[i].responseTime < selectedServer.responseTime) {
        selectedServer = servers[i];
      }
    }

    return selectedServer;
  }
}
