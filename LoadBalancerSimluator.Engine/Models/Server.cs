using System.Text;

namespace LoadBalancerSimluator.Engine.Models
{
    public class Server
    {
        public string ServerId { get; }

        public Server(string serverId, string serverAddress)
        {
            ServerId = serverId;
            ServerAddress = serverAddress;
        }

        public string ServerAddress { get; set; }
        public string ServerUrl => $"http://{ServerAddress}";
        public int Weight { get; set; }
        public int CurrentWeight { get; set; }
        public int EffectiveWeight { get; set; }
        public int Connections { get; set; }

        public override string ToString()
        {
            var serverDetails = $"ServerId: {ServerId}, ServerAddress: {ServerAddress}, Weight: {Weight}, CurrentWeight: {CurrentWeight}, EffectiveWeight: {EffectiveWeight}, Connections: {Connections}";
            return serverDetails;
        }
    }
}
