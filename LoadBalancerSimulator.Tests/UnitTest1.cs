using LoadBalancerSimluator.Engine;
using LoadBalancerSimluator.Engine.LoadBalancingAlgorithms;
using LoadBalancerSimluator.Engine.Models;
using System.Buffers.Text;

namespace LoadBalancerSimulator.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestLoadBalancerEngineWithRoundRobinAlgorithm()
        {
            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            var servers = new List<Server> { server1, server2, server3 };

            var loadBalancerEngine = new LoadBalancerSimulatorEngine();
            loadBalancerEngine.SetServers(servers);
            loadBalancerEngine.SetLoadBalancingAlgorithm(new RoundRobinLoadBalancingAlgorithm(servers));


            // act
            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < servers.Count; i++)
            {
                var selectedServer = loadBalancerEngine.GetNextServer();
                selectedServers.Add(selectedServer);
            }

            // one more time to test cycling
            selectedServers.Add(loadBalancerEngine.GetNextServer());

            // Assert
            Assert.That(selectedServers[0], Is.EqualTo(server1));
            Assert.That(selectedServers[1], Is.EqualTo(server2));
            Assert.That(selectedServers[2], Is.EqualTo(server3));
            // After the last server, it should cycle back to the first server.
            Assert.That(selectedServers[3], Is.EqualTo(server1));
        }

        [Test]
        public void TestLoadBalancerEngineWithWeightedRoundRobinAlgorithm()
        {
            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            server1.Weight = 20;
            server1.EffectiveWeight = 20;
            server2.Weight = 40;
            server2.EffectiveWeight = 40;
            server3.Weight = 10;
            server3.EffectiveWeight = 10;

            var servers = new List<Server> { server1, server2, server3 };

            var algorithm = new WeightedRoundRobinAlgorithm(servers);

            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < 3; i++)
            {
                var selectedServer = algorithm.GetServer();
                selectedServers.Add(selectedServer);
            }

            // Assert
            Assert.That(selectedServers[0], Is.EqualTo(server2));
            Assert.That(selectedServers[1], Is.EqualTo(server1));

        }

        [Test]
        public void TestStickyRoundRobinAlgorithm()
        {
            // Arrange

            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            var servers = new List<Server> { server1, server2, server3 };

            var algorithm = new StickyRoundRobinAlgorithm(servers);

            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < 5; i++)
            {
                var selectedServer = algorithm.GetServer();
                selectedServers.Add(selectedServer);
            }

            // Assert
            // The expected behavior is that the same server is selected for the same client identifier.
            for (int i = 1; i < selectedServers.Count; i++)
            {
                Assert.That(selectedServers[i], Is.EqualTo(selectedServers[0]));
            }
        }

        [Test]
        public void TestLeastTimeAlgorithm()
        {
            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            server1.Weight = 4;
            server2.Weight = 1;
            server3.Weight = 13;

            var servers = new List<Server> { server1, server2, server3 };

            var algorithm = new LeastTimeAlgorithm(servers);

            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < 5; i++)
            {
                var selectedServer = algorithm.GetServer();
                selectedServers.Add(selectedServer);
            }

            // Assert
            // The expected behavior is that the server with the least response time is selected.
            // We assume a simple response time measurement for testing.
            Assert.That(selectedServers[0], Is.EqualTo(server2));          
        }

        [Test]
        public void TestLeastConnectionsAlgorithm()
        {
            // Arrange
            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            var servers = new List<Server> { server3, server2, server1 };

            var algorithm = new LeastConnectionsAlgorithm(servers);

            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < 5; i++)
            {
                var selectedServer = algorithm.GetServer();
                selectedServers.Add(selectedServer);
            }

            // Assert
            // The expected behavior is that the server with the least connections is selected.
            Assert.That(selectedServers[0], Is.EqualTo(server3));
            Assert.That(selectedServers[1], Is.EqualTo(server2));
            Assert.That(selectedServers[2], Is.EqualTo(server1));
        }

        [Test]
        public void TestIPURLHashAlgorithm()
        {
            // Arrange
            var server1 = new Server("Server1", "192.168.1.101");
            var server2 = new Server("Server2", "192.168.1.102");
            var server3 = new Server("Server3", "192.168.1.103");

            var servers = new List<Server> { server1, server2, server3 };

            var algorithm = new IPURLHashAlgorithm(servers);

            // Act
            var selectedServers = new List<Server>();
            for (int i = 0; i < 5; i++)
            {
                var selectedServer = algorithm.GetServer();
                selectedServers.Add(selectedServer);
            }

            // Assert
            // The expected behavior is that the same server is selected for the same client identifier.
            for (int i = 1; i < selectedServers.Count; i++)
            {
                Assert.That(selectedServers[i], Is.EqualTo(selectedServers[0]));
            }
        }
    }
}