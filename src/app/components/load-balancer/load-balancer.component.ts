import { Component, Input } from '@angular/core';
import { LoadBalancer } from 'src/app/models/load-balancer.model';
import { LoadBalancingAlgorithemsProviderService } from 'src/app/services/load-balancing-algorithems-provider.service';

@Component({
  selector: 'app-load-balancer',
  templateUrl: './load-balancer.component.html',
  styleUrls: ['./load-balancer.component.scss']
})
export class LoadBalancerComponent {

  @Input() loadBalancerInstance: LoadBalancer | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
