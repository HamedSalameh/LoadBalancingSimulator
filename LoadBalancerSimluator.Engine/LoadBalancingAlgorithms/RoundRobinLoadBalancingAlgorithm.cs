using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public class RoundRobinLoadBalancingAlgorithm : ILoadBalancingAlgorithm
    {
        private IList<Server> _servers;
        private int _current = -1;

        public RoundRobinLoadBalancingAlgorithm(IList<Server> servers)
        {
            _servers = servers;
        }

        public void Initialize()
        {
            _current = -1;
        }

        public Server GetServer()
        {
            _current = (_current + 1) % _servers.Count;
            return _servers[_current];
        }
    }
}
