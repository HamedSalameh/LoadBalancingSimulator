using LoadBalancerSimluator.Engine.Models;

namespace LoadBalancerSimluator.Engine.LoadBalancingAlgorithms
{
    using System;
    using System.Collections.Generic;

    public class WeightedRoundRobinAlgorithm : ILoadBalancingAlgorithm
    {
        private List<Server> servers;
        private int currentIndex;
        private int maxWeight;
        private int gcd;

        public WeightedRoundRobinAlgorithm(List<Server> servers)
        {
            this.servers = servers;
            Initialize();
        }

        public void Initialize()
        {
            gcd = CalculateGCD(servers);
            maxWeight = CalculateMaxWeight(servers);
            currentIndex = -1;
        }

        public Server GetServer()
        {
            while (true)
            {
                currentIndex = (currentIndex + 1) % servers.Count;
                if (currentIndex == 0)
                {
                    maxWeight -= gcd;
                    if (maxWeight <= 0)
                    {
                        maxWeight = CalculateMaxWeight(servers);
                        if (maxWeight <= 0)
                        {
                            throw new InvalidOperationException("All servers have effectively reached a weight of 0.");
                        }
                    }
                }

                if (servers[currentIndex].EffectiveWeight >= maxWeight)
                {
                    servers[currentIndex].EffectiveWeight -= maxWeight;
                    return servers[currentIndex];
                }
            }
        }

        private int CalculateGCD(List<Server> servers)
        {
            int gcd = servers[0].Weight;
            for (int i = 1; i < servers.Count; i++)
            {
                gcd = CalculateGCD(gcd, servers[i].Weight);
            }
            return gcd;
        }

        private int CalculateGCD(int a, int b)
        {
            while (b != 0)
            {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }

        private int CalculateMaxWeight(List<Server> servers)
        {
            int max = 0;
            foreach (var server in servers)
            {
                max = Math.Max(max, server.EffectiveWeight);
            }
            return max;
        }
    }



}
