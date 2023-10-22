import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { LoadBalancer } from 'src/app/models/load-balancer.model';
import { Server } from 'src/app/models/server.model';
import { LoadBalancerState, ServerStatus } from 'src/app/models/types';
import { LoadBalancingAlgorithemsProviderService } from 'src/app/services/load-balancing-algorithems-provider.service';
import {
  StartSimulation,
  StopSimulation,
} from 'src/app/state/simulation/simulation.actions';
import { SimulationState } from 'src/app/state/simulation/simulation.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  mapServers: Server[] = [];
  mapLoadBalancers: LoadBalancer[] = [];
  requestInterval$ =
    this.store.select(SimulationState.getRequestInterval) || of(500);
  selectedLoadBalancingAlgorithm$ = this.store.select(
    SimulationState.getSelectedLoadBalancingAlgorithm
  );
  requestInterval: number = 500;

  constructor(
    private store: Store,
    private loadBalancingAlgorithemProvider: LoadBalancingAlgorithemsProviderService
  ) {
    this.mapServers.push(
      new Server('Server 1', ServerStatus.idle, 1, '192.168.1.1', 112),
      new Server('Server 2', ServerStatus.idle, 1, '192.168.1.2', 50),
      new Server('Server 3', ServerStatus.idle, 1, '192.168.1.3', 200),
      new Server('Server 4', ServerStatus.idle, 1, '192.168.1.4', 142)
    );

    // init the list of 1 load balancer for default
    let loadBalancer1 = new LoadBalancer('Load Balancer 1', '192.168.100.100');
    loadBalancer1.addServer(this.mapServers[0]);
    loadBalancer1.addServer(this.mapServers[1]);
    loadBalancer1.addServer(this.mapServers[2]);
    loadBalancer1.addServer(this.mapServers[3]);

    this.mapLoadBalancers.push(loadBalancer1);

    this.requestInterval$.subscribe((requestInterval) => {
      this.requestInterval = requestInterval ? requestInterval : 500;
      console.log('requestInterval: ' + this.requestInterval);
    });

    this.selectedLoadBalancingAlgorithm$.subscribe(
      selectedLoadBalancingAlgorithm => {
        if (selectedLoadBalancingAlgorithm) {
          
          const lba = this.loadBalancingAlgorithemProvider.getLoadBalancingAlgorithmById(selectedLoadBalancingAlgorithm);
          if (lba) {
            this.mapLoadBalancers[0].setLoadBalancingAlgorithm(lba);
          }
        }
      }
    );
  }

  // method to start simulation
  async startSimulation() {
    // TODO
    let activeLoadBalancer = this.mapLoadBalancers[0];
    console.log('Starting simulation...');

    console.log('Starting load balancer...');
    // patch the NGXS state
    this.store.dispatch(new StartSimulation());

    if (activeLoadBalancer.state === LoadBalancerState.inactive) {
      console.log('Resuming load balancer...');
      activeLoadBalancer.start();
    } else {
      console.log('Starting load balancer...');
      activeLoadBalancer.start();
    }

    while (activeLoadBalancer.state === LoadBalancerState.active) {
      // sleep for 2 seconds
      await new Promise((r) => setTimeout(r, this.requestInterval));
      activeLoadBalancer.handleRequest();
    }
  }
  // method to stop simulation
  stopSimulation() {
    // TODO
    let activeLoadBalancer = this.mapLoadBalancers[0];
    activeLoadBalancer.stop();
    this.store.dispatch(new StopSimulation());
  }

  addServer() {
    // TODO
    let newServer = this.createServer();
    this.mapServers.push(newServer);
    this.mapLoadBalancers[0].addServer(newServer);
  }

  private createServer(): Server {
    // create random wright between 1 to 10
    let randomWeight = Math.floor(Math.random() * 10) + 1;
    return new Server(
      'Server ' + (this.mapServers.length + 1),
      ServerStatus.idle,
      randomWeight,
      '192.168.1.' + (this.mapServers.length + 1)
    );
  }
}
