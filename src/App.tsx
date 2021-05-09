import {
  ArbitrumTestnet,
  Avalanche,
  Binance,
  Config,
  Matic,
  MaticTestnet,
  OptimismMainnet,
  OptimismTestnet,
  Sorbet,
  xDai,
} from "@huskyfinance/eth-sorbet";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { WindowChain } from "./types";

const App = () => {
  const [open, setOpen] = useState(true);
  const [userAddress, setUserAddress] = useState("");

  const [darkMode, setDarkMode] = useState(true)

  const [selectedNetwork, setNetwork] = useState(ArbitrumTestnet)

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
      dappName: "ETH Sorbet Demo App",
      open: open,
      handleClose: handleClose,

      // optional
      address: userAddress,

      // dapp
      dappLogo: "https://www.kkbox.com/about/img/app_icons/kkbox_app_icon.png",

      // darkmode
      darkMode: darkMode
    };
  }, [selectedNetwork, handleClose, userAddress, open, darkMode])

  return (
      <h1>ETH Sorbet Demo!</h1>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Sorbet config={config} walletProvider={provider} />
      <h5>Address: {userAddress} </h5>
      
      <input type="checkbox" name="gender" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}/>
      <label>DarkMode</label>
      <br/>
      <br/>
      
      <input type="radio" id="ar" checked={selectedNetwork===ArbitrumTestnet} onClick={() => setNetwork(ArbitrumTestnet)}/>
      <label>Arbitrum</label>
      <br/>

      <input type="radio" id="op" checked={selectedNetwork===OptimismMainnet} onClick={() => setNetwork(OptimismMainnet)}/>
      <label>Optimism</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===xDai} onClick={() => setNetwork(xDai)}/>
      <label>xDai</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===Matic} onClick={() => setNetwork(Matic)}/>
      <label>Matic</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===Binance} onClick={() => setNetwork(Binance)}/>
      <label>Binance</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===Avalanche} onClick={() => setNetwork(Avalanche)}/>
      <label>Avalanche</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===OptimismTestnet} onClick={() => setNetwork(OptimismTestnet)}/>
      <label>Optimism Testnet</label>
      <br/>

      <input type="radio" id="male" checked={selectedNetwork===MaticTestnet} onClick={() => setNetwork(MaticTestnet)}/>
      <label>Matic Testnet</label>
      <br/>

      <br/>
      {/* <br> */}
      {/* <input type="radio" id="female" name="gender" value="female"> </input> */}
      {/* <label for="female">Female</label> */}
      {/* <br> */}
      {/* <input type="radio" id="other" name="gender" value="other"> </input> */}
      {/* <label for="other">Other</label> */}

    </div>
  );
};

export default App;
