import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadBalancingAlgorithm } from 'src/app/algorithems/algorithem.interface';
import { LoadBalancingAlgorithemsProviderService } from 'src/app/services/load-balancing-algorithems-provider.service';
import { SetRequestInterval, SetSelectedLoadBalancingAlgorithm } from 'src/app/state/simulation/simulation.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  requestInterval: number  = 500;
  loadBalancingAlgorithms: LoadBalancingAlgorithm[] = [];
  selectedLoadBalancingAlgorithm: LoadBalancingAlgorithm | undefined; // Initialize with a default value if needed

  @Output() startSimulationEvent = new EventEmitter<void>();
  @Output() stopSimulationEvent = new EventEmitter<void>();
  @Output() addServerEvent = new EventEmitter<void>();

  simluationRunning$ = this.store.select((state) => state.simulation.Running);
  requestInterval$ = this.store.select((state) => state.simulation.RequestInterval);

  constructor(
    private store: Store,
    loadBalacingAlgorithems: LoadBalancingAlgorithemsProviderService
  ) {
    this.loadBalancingAlgorithms =
      loadBalacingAlgorithems.getAllLoadBalancingAlgorithms();

      this.selectedLoadBalancingAlgorithm = this.loadBalancingAlgorithms[0];
  }

  onAlgorithmChange() {
    // Dispatch an action to update the selected algorithm in your application state
    if (this.selectedLoadBalancingAlgorithm)
    {
      console.log(JSON.stringify(this.selectedLoadBalancingAlgorithm));
      this.store.dispatch(
        new SetSelectedLoadBalancingAlgorithm(this.selectedLoadBalancingAlgorithm)
      );
    }
  }

  stopSimulation() {
    this.stopSimulationEvent.emit();
  }
  startSimulation() {
    
    this.store.dispatch(new SetRequestInterval(this.requestInterval));
    this.startSimulationEvent.emit();
  }
  addServer() {
    this.addServerEvent.emit();
  }
}
