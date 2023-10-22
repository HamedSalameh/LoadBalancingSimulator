import { LoadBalancingAlgorithm } from "../algorithems/algorithem.interface";
import { Server } from "./server.model";
import { LoadBalancerState } from "./types";

export class LoadBalancer {
    
    state: LoadBalancerState;   // active, inactive
    name: string;
    address: string;
    loadBalancingAlgorithm: LoadBalancingAlgorithm | undefined;
    servers: Server[] = [];

    constructor(
        name: string, address: string, state: LoadBalancerState = LoadBalancerState.active) {
        this.name = name;
        this.address = address;
        this.state = state;
    }

    addServer(server: Server) {
        if (server) {
            this.servers.push(server);
        }
    }

    public getLoadBalancingAlgorithm() {
        return this.loadBalancingAlgorithm;
    }

    public setLoadBalancingAlgorithm(algorithm: LoadBalancingAlgorithm | undefined) {
        this.loadBalancingAlgorithm = algorithm;
    }

    public start() {
        this.state = LoadBalancerState.active;
    }

    public stop() {
        this.state = LoadBalancerState.inactive;
    }

    handleRequest() {
        if (this.state === LoadBalancerState.active) {
            // get the next server based on the load balancing algorithm
            const nextServer = this.loadBalancingAlgorithm?.SelectNextServer(this.servers);
            if (nextServer) {
                nextServer.handleRequest();
            }
        }
      }
      
}