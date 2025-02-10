/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Home from "./components/pages/Home";

const Web3ProviderNetwork = createWeb3ReactRoot("NETWORK");

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => (
  <Web3ProviderNetwork getLibrary={getLibrary}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  </Web3ProviderNetwork>
);

export default App;
