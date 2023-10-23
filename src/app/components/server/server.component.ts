import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Server } from 'src/app/models/server.model';
import { ServerStatus } from 'src/app/models/types';
import { ServersPoolService } from 'src/app/services/servers-pool.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  @Input() server: Server | undefined;
  @Output() RemoveServer: EventEmitter<any> = new EventEmitter();

  ServerStatus: any;

  constructor(private serverPool: ServersPoolService) {}

  ngOnInit(): void {
    console.log(this.server);
  }

  removeServer() {
    if (this.server)
      this.serverPool.removeServer(this.server);
  }
}
