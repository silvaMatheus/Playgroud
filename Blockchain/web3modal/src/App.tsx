import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

function App() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [chainId, setChainId] = useState();
  const [error, setError] = useState("");

  const [account, setAccount] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <VStack>
      <Text> Connect wallet using web3modal</Text>
      <HStack>
        {!account ? (
          <Button> Connect Wallet</Button>
        ) : (
          <Button> Disconnect </Button>
        )}
      </HStack>

      <VStack>
        <HStack>
          <Text>Connection Status</Text>
          {account ? (
            <CheckCircleIcon color="green" />
          ) : (
            <WarningIcon color="#cd5700" />
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}

export default App;
