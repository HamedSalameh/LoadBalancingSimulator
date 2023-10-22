import { Component, Input } from '@angular/core';
import { Server } from 'src/app/models/server.model';
import { ServerStatus } from 'src/app/models/types';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {

  @Input() server: Server | undefined;

  ServerStatus: any;
 
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.server);
    }
  }
