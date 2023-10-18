using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public class IPURLHashAlgorithm : ILoadBalancingAlgorithm
    {
        private List<Server> servers;
        private Dictionary<string, Server> ipUrlServerMap;

        public IPURLHashAlgorithm(List<Server> servers)
        {
            this.servers = servers;
            ipUrlServerMap = new Dictionary<string, Server>();
            Initialize();
        }

        public void Initialize()
        {
            // Initialize the mapping between IP/URL and servers.
            foreach (var server in servers)
            {
                // Store both IP and URL as keys for the same server.
                ipUrlServerMap[server.ServerAddress] = server;
                ipUrlServerMap[server.ServerUrl] = server;
            }
        }

        public Server GetServer()
        {
            string clientIdentifier = GetClientIdentifier();
            int hash = clientIdentifier.GetHashCode();
            int index = (hash & int.MaxValue) % servers.Count; // Ensure a positive index.
            return servers[index];
        }

        private string GetClientIdentifier()
        {
            // Replace this with logic to identify the client (e.g., using the client's IP address or URL).
            // For demonstration purposes, we assume a simple client identifier.
            return "Client123";
        }
    }
}
