using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public class LeastTimeAlgorithm : ILoadBalancingAlgorithm
    {
        private List<Server> servers;

        public LeastTimeAlgorithm(List<Server> servers)
        {
            this.servers = servers;
            Initialize();
        }

        public void Initialize()
        {
            // Initialize the effective weight and connections for each server.
            foreach (var server in servers)
            {
                server.EffectiveWeight = server.Weight;
                server.Connections = 0;
            }
        }

        public Server GetServer()
        {
            Server selectedServer = servers.First();
            double minResponseTime = double.MaxValue;

            foreach (var server in servers)
            {
                if (server.EffectiveWeight == 0)
                {
                    continue; // Skip servers with no effective weight.
                }

                double responseTime = MeasureResponseTime(server); // Replace with your logic to measure response time.

                if (responseTime < minResponseTime)
                {
                    selectedServer = server;
                    minResponseTime = responseTime;
                }
            }

            selectedServer.Connections++;
            selectedServer.EffectiveWeight += 1;
            return selectedServer;
        }

        // Implement your logic to measure the response time for a server.
        private double MeasureResponseTime(Server server)
        {
            // Replace this with your actual logic to measure response time.
            // For demonstration purposes, we assume a simple response time measurement.
            return server.EffectiveWeight * 0.1;
        }
    }
}
