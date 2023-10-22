import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // A form contains a drop for algorithms and a text input for the request interval
  // The form should be bound to a model in your component
  // The model should contain the selected algorithm and the request interval
  simulationConfig!: FormGroup;

  requestInterval: number  = 500;
  loadBalancingAlgorithms: LoadBalancingAlgorithm[] = [];

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

      this.simulationConfig = new FormGroup({
        requestInterval: new FormControl(this.requestInterval, [Validators.required]),
        selectedLoadBalancingAlgorithm: new FormControl(this.loadBalancingAlgorithms[0]),
      });

      this.simulationConfig.controls['selectedLoadBalancingAlgorithm'].setValue(this.loadBalancingAlgorithms[0], {onlySelf: true});

      this.simulationConfig.get('selectedLoadBalancingAlgorithm')?.valueChanges.subscribe((value) => {
        const id = parseInt(value);
        this.store.dispatch(new SetSelectedLoadBalancingAlgorithm(id));
      });

      this.simulationConfig.get('requestInterval')?.valueChanges.subscribe((value) => {
        this.store.dispatch(new SetRequestInterval(value));
      });
  }

  stopSimulation() {
    this.stopSimulationEvent.emit();
  }
  startSimulation() {
    this.startSimulationEvent.emit();
  }
  addServer() {
    this.addServerEvent.emit();
  }
}
