import { Component } from '@angular/core';
import { LoadBalancer } from 'src/app/models/load-balancer.model';
import { Server } from 'src/app/models/server.model';
import { LoadBalancerState, ServerStatus } from 'src/app/models/types';
import { LoadBalancingAlgorithemsProviderService } from 'src/app/services/load-balancing-algorithems-provider.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  mapServers : Server[] = [];
  mapLoadBalancers : LoadBalancer[] = [];

  constructor(private loadBalancingAlgorithemProvider : LoadBalancingAlgorithemsProviderService) { }

  ngOnInit(): void {
    // init the list of 1 server for default
    this.mapServers.push(
      new Server('Server 1', ServerStatus.idle, 1, '192.168.1.1'),
      new Server('Server 2', ServerStatus.idle, 1, '192.168.1.2'),
      new Server('Server 3', ServerStatus.idle, 1, '192.168.1.3'),
      new Server('Server 4', ServerStatus.idle, 1, '192.168.1.4'),
      );

    // init the list of 1 load balancer for default
    let loadBalancer1 = new LoadBalancer('Load Balancer 1', '192.168.100.100');
    loadBalancer1.setLoadBalancingAlgorithm(this.loadBalancingAlgorithemProvider.getLoadBalancingAlgorithmById(1));
    loadBalancer1.addServer(this.mapServers[0]);
    loadBalancer1.addServer(this.mapServers[1]);
    loadBalancer1.addServer(this.mapServers[2]);
    loadBalancer1.addServer(this.mapServers[3]);
    
    this.mapLoadBalancers.push(loadBalancer1);
  }

  // method to start simulation
  async startSimulation() {
    // TODO
    let activeLoadBalancer = this.mapLoadBalancers[0];
    console.log('Starting simulation...');

    console.log('Starting load balancer...');
    if (activeLoadBalancer.state === LoadBalancerState.inactive) {
      console.log('Resuming load balancer...');
      activeLoadBalancer.start();
    } else {
      console.log('Starting load balancer...');
      activeLoadBalancer.start();
    }

    while (activeLoadBalancer.state === LoadBalancerState.active) {
      // sleep for 2 seconds
      await new Promise(r => setTimeout(r, 500));
      activeLoadBalancer.handleRequest();
    }
  }
  // method to stop simulation
  stopSimulation() {
    // TODO
    let activeLoadBalancer = this.mapLoadBalancers[0];
    activeLoadBalancer.stop();
  }
}