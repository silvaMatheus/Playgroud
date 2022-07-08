import Web3Address from "./components/Web3Address";
import { Web3Button } from "./components/Web3Button";
import { Web3ContextProvider } from "./context";

function App() {
  return (
    <div>
      <Web3ContextProvider>
        <Web3Button />
        <Web3Address />
      </Web3ContextProvider>
    </div>
  );
}

export default App;
