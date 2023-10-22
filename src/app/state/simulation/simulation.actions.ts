import { LoadBalancingAlgorithm } from "src/app/algorithems/algorithem.interface";

export class StartSimulation {
    static readonly type = '[Simulation] Start';

    constructor() {}
}

export class StopSimulation {
    static readonly type = '[Simulation] Stop';

    constructor() {}
}

export class SetSelectedLoadBalancingAlgorithm {
    static readonly type = '[Simulation] Set Selected Load Balancing Algorithm';

    constructor(public payload: number) {}
}

export class SetRequestInterval {
    static readonly type = '[Simulation] Set Request Interval';

    constructor(public payload: number) {}
}