import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Server } from 'src/app/models/server.model';
import { ServerStatus } from 'src/app/models/types';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  @Input() server: Server | undefined;
  @Output() RemoveServer: EventEmitter<any> = new EventEmitter();

  ServerStatus: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.server);
  }

  removeServer() {
    this.RemoveServer.emit(this.server);
  }
}
