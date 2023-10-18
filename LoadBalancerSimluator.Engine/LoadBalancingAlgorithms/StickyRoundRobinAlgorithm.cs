using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    public class StickyRoundRobinAlgorithm : ILoadBalancingAlgorithm
    {
        private List<Server> servers;
        private Dictionary<string, int> clientServerMap;
        private int currentIndex;

        public StickyRoundRobinAlgorithm(List<Server> servers)
        {
            this.servers = servers;
            clientServerMap = new Dictionary<string, int>();
            Initialize();
        }

        public void Initialize()
        {
            currentIndex = -1;
        }

        public Server GetServer()
        {
            while (true)
            {
                currentIndex = (currentIndex + 1) % servers.Count;

                string clientIdentifier = GetClientIdentifier(); // Replace with your logic to identify the client.

                if (clientServerMap.ContainsKey(clientIdentifier))
                {
                    currentIndex = clientServerMap[clientIdentifier];
                }
                else
                {
                    clientServerMap[clientIdentifier] = currentIndex;
                }

                return servers[currentIndex];
            }
        }

        private string GetClientIdentifier()
        {
            // Replace this with logic to identify the client (e.g., using the client's IP address).
            // For demonstration purposes, we assume a simple client identifier.
            return "Client123";
        }
    }
}
