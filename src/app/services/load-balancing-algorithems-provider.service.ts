import { Injectable } from '@angular/core';
import { RoundRobinAlgorithem } from '../algorithems/round-robim.algorithem';
import { LoadBalancingAlgorithm } from '../algorithems/algorithem.interface';
import { LeastConnectionsLoadBalancingAlgorithm } from '../algorithems/least-connections.algorithem';
import { LeastResponseTimeAlgorithm } from '../algorithems/least-response-time.algorithem';

@Injectable({
  providedIn: 'root'
})
export class LoadBalancingAlgorithemsProviderService {

  loadBalancingAlgorithms : LoadBalancingAlgorithm[] = [];

  constructor() { 

    // populate the loadBalancingAlgorithms array with all the load balancing algorithms
    // that are available in the application
    this.loadBalancingAlgorithms.push(new RoundRobinAlgorithem());
    this.loadBalancingAlgorithms.push(new LeastConnectionsLoadBalancingAlgorithm());
    this.loadBalancingAlgorithms.push(new LeastResponseTimeAlgorithm());
  }

  // returns the load balancing algorithm with the given id
  getLoadBalancingAlgorithmById(id: number): LoadBalancingAlgorithm | undefined {
    
    const lba = this.loadBalancingAlgorithms.find(algorithem => algorithem.id === id);
    return lba;
  }

  // returns all the load balancing algorithms
  getAllLoadBalancingAlgorithms(): LoadBalancingAlgorithm[] {
    return this.loadBalancingAlgorithms;
  }
}
