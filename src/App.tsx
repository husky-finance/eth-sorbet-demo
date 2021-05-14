import {
  ArbitrumTestnet,
  Avalanche,
  Binance,
  Config,
  Matic,
  MaticTestnet,
  OptimismMainnet,
  OptimismTestnet,
  Sokol,
  Sorbet,
  xDai,
} from "@huskyfinance/eth-sorbet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WindowChain } from "./types";

const App = () => {
  const [open, setOpen] = useState(true);
  const [userAddress, setUserAddress] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  const [selectedNetwork, setNetwork] = useState(OptimismTestnet);

  const provider = (window as WindowChain).ethereum;

  useEffect(() => {
    const fetchData = async (provider: any) => {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setUserAddress(account);
    };

    if (!provider || !provider.request) {
      const errorMessage =
        "Can't setup get Provider. window.ethereum is undefined";
      setUserAddress(errorMessage);
    } else {
      fetchData(provider);
    }
  }, [provider]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const config: Config = useMemo(() => {
    return {
      targetNetwork: selectedNetwork,
      dappName: "ETH Sorbet Demo",
      open: open,
      handleClose: handleClose,

      // optional
      address: userAddress,

      // dapp
      dappLogo: "https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png",

      // darkmode
      darkMode: darkMode,
    };
  }, [selectedNetwork, handleClose, userAddress, open, darkMode]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ETH Sorbet Demo!</h1>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Sorbet config={config} walletProvider={provider} />
      <h5>Address: {userAddress} </h5>

      <input
        type="checkbox"
        name="gender"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />
      <label>DarkMode</label>
      <br />
      <br />

      <input
        type="radio"
        id="ar"
        checked={selectedNetwork === ArbitrumTestnet}
        onClick={() => setNetwork(ArbitrumTestnet)}
      />
      <label>Arbitrum (Kovan)</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === Avalanche}
        onClick={() => setNetwork(Avalanche)}
      />
      <label>Avalanche</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === Binance}
        onClick={() => setNetwork(Binance)}
      />
      <label>Binance Smart Chain</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === Matic}
        onClick={() => setNetwork(Matic)}
      />
      <label>Polygon / Matic (Mainnet)</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === MaticTestnet}
        onClick={() => setNetwork(MaticTestnet)}
      />
      <label>Polygon / Matic (Mumbai)</label>
      <br />

      <input
        type="radio"
        id="op"
        checked={selectedNetwork === OptimismMainnet}
        onClick={() => setNetwork(OptimismMainnet)}
      />
      <label>Optimism (Mainnet) </label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === OptimismTestnet}
        onClick={() => setNetwork(OptimismTestnet)}
      />
      <label>Optimism (Kovan)</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === Sokol}
        onClick={() => setNetwork(Sokol)}
      />
      <label>POA (Sokol)</label>
      <br />

      <input
        type="radio"
        id="male"
        checked={selectedNetwork === xDai}
        onClick={() => setNetwork(xDai)}
      />
      <label>xDai</label>
      <br />

      <br />
    </div>
  );
};

export default App;
