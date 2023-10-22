import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetRequestInterval, SetSelectedLoadBalancingAlgorithm, StartSimulation, StopSimulation } from "./simulation.actions";
import { LoadBalancingAlgorithm } from "src/app/algorithems/algorithem.interface";

export class SimulationStateModel {
    Running: boolean | undefined;
    Started: boolean | undefined;
    SelectedLoadBalancingAlgorithm: number | undefined;
    RequestInterval: number | undefined;
}

@State<SimulationStateModel>({
    name: 'simulation',
    defaults: {
        Running: false,
        Started: false,
        SelectedLoadBalancingAlgorithm: undefined,
        RequestInterval: 500
    }
})
export class SimulationState {
    // here is where we degine selectors and actions

    @Selector()
    static getRequestInterval(state: SimulationStateModel) {
        return state.RequestInterval;
    }

    @Selector()
    static getSelectedLoadBalancingAlgorithm(state: SimulationStateModel) : number | undefined{
        return state.SelectedLoadBalancingAlgorithm;
    }

    @Selector()
    static isRunning(state: SimulationStateModel) {
        return state.Running;
    }

    @Selector()
    static isStarted(state: SimulationStateModel) {
        return state.Started;
    }

    @Action(StopSimulation)
    stopSimulation({getState, patchState}: StateContext<SimulationStateModel>) {
        const state = getState();
        patchState({
            Running: false,
            Started: false
        });
    }

    @Action(StartSimulation)
    startSimulation({getState, patchState}: StateContext<SimulationStateModel>) {
        const state = getState();
        patchState({
            Running: true,
            Started: true
        });
    }

    @Action(SetSelectedLoadBalancingAlgorithm)
    setSelectedLoadBalancingAlgorithm({getState, patchState}: StateContext<SimulationStateModel>, {payload}: SetSelectedLoadBalancingAlgorithm) {
        const state = getState();
        patchState({
            SelectedLoadBalancingAlgorithm: payload
        });
    }

    @Action(SetRequestInterval)
    setRequestInterval({getState, patchState}: StateContext<SimulationStateModel>, {payload}: SetRequestInterval) {
        const state = getState();
        patchState({
            RequestInterval: payload
        });
    }
}