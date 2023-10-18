// See https://aka.ms/new-console-template for more information
using LoadBalancerSimluator.Engine;
using LoadBalancerSimluator.Engine.LoadBalancingAlgorithms;
using LoadBalancerSimluator.Engine.Models;

ILoadBalancerEngine loadBalancerEngine = new LoadBalancerSimulatorEngine();

// generate server list with random ip address and random weights
var servers = Enumerable.Range(1, 10)
    .Select(i => new Server(i.ToString(), $"192.168.0.{i}")
    {
        Weight = new Random().Next(1, 10),
        EffectiveWeight = new Random().Next(1, 10)
    })
    .ToList();

while (true)
{
    Console.WriteLine("Loaded Servers");
    foreach (var server in servers)
    {
        Console.WriteLine($"Server:  {server}");
    }

    Console.WriteLine(Environment.NewLine);
    Console.WriteLine("Load Balancing Algorithm Menu");
    Console.WriteLine("1. Round Robin");
    Console.WriteLine("2. Weighted Round Robin");
    Console.WriteLine("3. Sticky Round Robin");
    Console.WriteLine("4. IP Hash");
    Console.WriteLine("5. Least Connections");
    Console.WriteLine("6. Least Time");
    Console.WriteLine("0. Exit");

    Console.Write("Enter your choice: ");
    var choice = Console.ReadLine();

    switch (choice)
    {
        case "1":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new RoundRobinLoadBalancingAlgorithm(servers));
            break;
        case "2":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new WeightedRoundRobinAlgorithm(servers));
            break;
        case "3":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new StickyRoundRobinAlgorithm(servers));
            break;
        case "4":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new IPURLHashAlgorithm(servers));
            break;
        case "5":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new LeastConnectionsAlgorithm(servers));
            break;
        case "6":
            loadBalancerEngine.SetLoadBalancingAlgorithm(new LeastTimeAlgorithm(servers));
            break;
        case "0":
            return;
        default:
            Console.WriteLine("Invalid choice. Press any key to continue...");
            Console.ReadKey();
            continue;
    }

    

    // Do the demo
    var selectedServers = new List<Server>();
    for (int i = 0; i < 10; i++)
    {
        var selectedServer = loadBalancerEngine.GetNextServer();
        selectedServers.Add(selectedServer);
    }

    Console.WriteLine("Selected Servers:");
    foreach (var server in selectedServers)
    {
        Thread.Sleep(125);
        Console.WriteLine($"Server Name: {server.ServerId}, IP Address: {server.ServerAddress}");
    }

    Console.WriteLine();
}