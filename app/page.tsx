"use client";

import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import Home from "@/components/pages/Home";

function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function Page() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}
