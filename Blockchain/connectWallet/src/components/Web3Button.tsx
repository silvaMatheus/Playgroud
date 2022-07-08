import { useWeb3Context } from "../context";

interface ConnectProps {
  connect: (() => Promise<void>) | null;
}

const ConnectButton = ({ connect }: ConnectProps) => {
  console.log(connect);
  return connect ? (
    <button onClick={connect}>Connect</button>
  ) : (
    <button>Lodding.</button>
  );
};

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null;
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <button onClick={disconnect}> Disconnect</button>
  ) : (
    <button>Loadding..</button>
  );
};

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context();

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  );
}
