import { Component, EventEmitter, Output } from '@angular/core';
import { LoadBalancingAlgorithemsProviderService } from 'src/app/services/load-balancing-algorithems-provider.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  loadBalancingAlgorithms: string[] = [];

  @Output() startSimulationEvent = new EventEmitter<void>();
  @Output() stopSimulationEvent = new EventEmitter<void>();
  @Output() addServerEvent = new EventEmitter<void>();

  constructor(private loadBalacingAlgorithems: LoadBalancingAlgorithemsProviderService) {
    this.loadBalancingAlgorithms = loadBalacingAlgorithems.getAllLoadBalancingAlgorithms().map(algorithem => algorithem.name);
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
