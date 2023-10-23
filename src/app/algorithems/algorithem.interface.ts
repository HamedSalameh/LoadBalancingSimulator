import { Server } from "../models/server.model";

export interface LoadBalancingAlgorithm {
    // The id of the load balancing algorithm
    id: number;
    // The name of the load balancing algorithm
    name: string;
    // The function that will be called when the load balancer is handling a request
    SelectNextServer: (servers: Server[], ...args: any[]) => Server | undefined;
}