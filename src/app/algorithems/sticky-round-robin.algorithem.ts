import { Client } from '../models/client.model';
import { Server } from '../models/server.model';
import { LoadBalancingAlgorithm } from './algorithem.interface';

export class StickyRoundRobinAlgorithem implements LoadBalancingAlgorithm {

  private clientToServerMap: Map<string, { server: Server; lastUsed: number }> =
    new Map();

  id: number;
  name: string;
  description: string;
  roundRobinIndex: number = 0;

  constructor() {
    this.id = 2;
    this.name = 'Sticky Round Robin';
    this.description =
      'Sticky Round Robin is a load balancing algorithem that will select the server with the least connections.';
  }

  SelectNextServer(servers: Server[], args: any[]): Server | undefined {
    
    const client = args[0] as Client;
    // check if the client was already assigned a server and if last used in the past 30 seconds
    if (this.clientToServerMap.has(client.address)) {
      const server = this.clientToServerMap.get(client.address)!.server;
      const lastUsed = this.clientToServerMap.get(client.address)!.lastUsed;
      if (Date.now() - lastUsed < 30000) {
        console.log('Stickiness: client ' + client.address + ' is sticky to server ' + server.name);
        return server;
      }
    }

    // if not, find the next server in the round robin fashion
    if (servers.length === 0) {
      return undefined;
    }

    const selectedServer = servers[this.roundRobinIndex];
    this.roundRobinIndex = (this.roundRobinIndex + 1) % servers.length;

    // before returning the server, update the client to server map
    console.log('Updating map : client ' + client.address + ' is sticky to server ' + selectedServer.name);
    this.clientToServerMap.set(client.address, {
      server: selectedServer,
      lastUsed: Date.now(),
    });

    return selectedServer;
  }
}
