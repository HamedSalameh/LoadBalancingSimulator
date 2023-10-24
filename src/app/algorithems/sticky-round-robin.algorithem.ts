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
      'Sticky Round Robin is a load balancing algorithem that will select the next server in the list of servers in a round robin fashion. It will also try to stick a client to a server for 30 seconds.';
  }

  SelectNextServer(servers: Server[], args: any[]): Server | undefined {
    
    const client = args[0] as Client;
    const STICKINESS_TIMEOUT = 30000;
    
    // check if the client was already assigned a server and if last used in the past 30 seconds
    if (this.clientToServerMap.has(client.address)) {
      const server = this.clientToServerMap.get(client.address)!.server;
      const lastUsed = this.clientToServerMap.get(client.address)!.lastUsed;

      if (Date.now() - lastUsed < STICKINESS_TIMEOUT) {
        console.log(`Stickiness: client ${client.address} is sticky to server ${server.name}`);
        return server;
      } else {
        // If lastUsed is old, then remove the client from the map
        this.clientToServerMap.delete(client.address);
        console.log(`Removing client ${client.address} from the sticky map`);
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
