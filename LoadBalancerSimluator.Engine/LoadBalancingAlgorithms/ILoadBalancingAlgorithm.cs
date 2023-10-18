using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public interface ILoadBalancingAlgorithm
    {
        void Initialize();
        Server GetServer();
    }
}
