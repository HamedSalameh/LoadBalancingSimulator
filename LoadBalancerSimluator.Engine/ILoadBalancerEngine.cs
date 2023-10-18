using LoadBalancerSimluator.Engine.LoadBalancingAlgorithms;
using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine
{

    public interface ILoadBalancerEngine
    {
        void SetServers(List<Server> servers);

        void SetLoadBalancingAlgorithm(ILoadBalancingAlgorithm algorithm);

        Server GetNextServer();
    }

}
