/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Web3ProviderNetwork } from "@web3-react/network";
import { Web3Provider } from "@ethersproject/providers";
import Home from "./components/pages/Home";
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => (
  <Web3ProviderNetwork getLibrary={getLibrary}>
    <Web3ReactProvider connectors={[]}>
      <Home />
    </Web3ReactProvider>
  </Web3ProviderNetwork>
);

export default App;
