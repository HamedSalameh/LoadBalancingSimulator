using LoadBalancerSimluator.Engine.LoadBalancingAlgorithms;
using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine
{
    public class LoadBalancerSimulatorEngine : ILoadBalancerEngine
    {
        private List<Server> servers = new();
        private ILoadBalancingAlgorithm? loadBalancingAlgorithm;

        public void SetServers(List<Server> servers)
        {
            this.servers = servers;
            this.loadBalancingAlgorithm = null;
        }

        public void SetLoadBalancingAlgorithm(ILoadBalancingAlgorithm algorithm)
        {
            loadBalancingAlgorithm = algorithm;
        }

        public Server GetNextServer()
        {
            if (servers == null || loadBalancingAlgorithm == null)
            {
                throw new InvalidOperationException("Servers and load balancing algorithm must be set before using GetServer.");
            }

            return loadBalancingAlgorithm.GetServer();
        }
    }

}
