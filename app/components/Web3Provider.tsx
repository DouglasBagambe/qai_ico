// FILE: components/Web3Provider.tsx

import React from "react";
import { WagmiProvider } from "wagmi";
import { createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { http } from "viem";
import { injected } from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [injected()],
});

const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default Web3Provider;
