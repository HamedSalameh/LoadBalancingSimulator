using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public class LeastConnectionsAlgorithm : ILoadBalancingAlgorithm
    {
        private List<Server> servers;

        public LeastConnectionsAlgorithm(List<Server> servers)
        {
            this.servers = servers;
            Initialize();
        }

        public void Initialize()
        {
            // Initialize the number of connections for each server to zero.
            foreach (var server in servers)
            {
                server.Connections = 0;
            }
        }

        public Server GetServer()
        {
            Server selectedServer = null;
            int minConnections = int.MaxValue;

            foreach (var server in servers)
            {
                if (server.Connections < minConnections)
                {
                    selectedServer = server;
                    minConnections = server.Connections;
                }
            }

            if (selectedServer != null)
            {
                selectedServer.Connections++;
            }
            return selectedServer;
        }
    }
}
