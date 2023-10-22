import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // import BrowserAnimationsModule
import { MatSelectModule } from '@angular/material/select'; // import MatSelectModule
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'; // import MatFormFieldModule
import { MatButtonModule } from '@angular/material/button'; // import MatButtonsModule
import { MatInputModule } from '@angular/material/input'; // import MatInputModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ServerComponent } from './components/server/server.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoadBalancerComponent } from './components/load-balancer/load-balancer.component';
import { NgxsModule } from '@ngxs/store';
import { SimulationState } from './state/simulation/simulation.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ServerComponent,
    MenuComponent,
    LoadBalancerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // NGXS
    NgxsModule.forRoot([
      SimulationState
    ]),
    
    BrowserAnimationsModule, // add BrowserAnimationsModule to imports
    MatButtonModule, // add MatButtonsModule to imports
    MatSelectModule, // add MatSelectModule to imports
    MatFormFieldModule, // add MatFormFieldModule to imports,
    MatInputModule // add MatInputModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
