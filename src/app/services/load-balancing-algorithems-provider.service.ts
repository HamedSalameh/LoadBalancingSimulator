import { Injectable } from '@angular/core';
import { RoundRobinAlgorithem } from '../algorithems/round-robim.algorithem';
import { LoadBalancingAlgorithm } from '../algorithems/algorithem.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadBalancingAlgorithemsProviderService {

  loadBalancingAlgorithms : LoadBalancingAlgorithm[] = [];

  constructor() { 

    // populate the loadBalancingAlgorithms array with all the load balancing algorithms
    // that are available in the application
    this.loadBalancingAlgorithms.push(new RoundRobinAlgorithem());

  }

  // returns the load balancing algorithm with the given id
  getLoadBalancingAlgorithmById(id: number): LoadBalancingAlgorithm | undefined {
    return this.loadBalancingAlgorithms.find(algorithem => algorithem.id === id);
  }

  // returns all the load balancing algorithms
  getAllLoadBalancingAlgorithms(): LoadBalancingAlgorithm[] {
    return this.loadBalancingAlgorithms;
  }
}
