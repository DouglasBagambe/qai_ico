/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createConfig,
  http,
  WagmiProvider,
  useAccount,
  useConnect,
} from "wagmi";
import { hardhat } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ethers } from "ethers";
import QSETokenArtifact from "../artifacts/contracts/QSE.sol/QSEToken.json";
import QSECrowdsaleArtifact from "../artifacts/contracts/QSECrowdsale.sol/QSECrowdsale.json";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Replace with your deployed addresses
const QSE_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const QSE_CROWDSALE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Configure chains & providers for wagmi v2
const config = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(),
  },
  connectors: [injected()],
});

type Web3ContextType = {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  qseToken: ethers.Contract | null;
  qseCrowdsale: ethers.Contract | null;
  connectWallet: () => void;
  buyTokens: (
    ethAmount: string,
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  isConnecting: boolean;
  isConnected: boolean;
  tokenRate: number;
  burnRate: number;
};

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  qseToken: null,
  qseCrowdsale: null,
  connectWallet: () => {},
  buyTokens: async () => ({ success: false, message: "" }),
  isConnecting: false,
  isConnected: false,
  tokenRate: 5000,
  burnRate: 2,
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3ContextProvider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [qseToken, setQseToken] = useState<ethers.Contract | null>(null);
  const [qseCrowdsale, setQseCrowdsale] = useState<ethers.Contract | null>(
    null
  );
  const [tokenRate, setTokenRate] = useState(5000);
  const [burnRate, setBurnRate] = useState(2);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      // Check if already connected
      ethProvider
        .listAccounts()
        .then((accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
            setIsConnected(true);
            initializeProviderAndContracts(ethProvider);
          }
        })
        .catch(console.error);

      // Set up event listeners
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, []);

  const initializeProviderAndContracts = async (
    ethProvider: ethers.BrowserProvider
  ) => {
    try {
      const network = await ethProvider.getNetwork();
      const signer = await ethProvider.getSigner();
      setSigner(signer);
      setChainId(Number(network.chainId));

      if (QSE_TOKEN_ADDRESS) {
        const token = new ethers.Contract(
          QSE_TOKEN_ADDRESS,
          QSETokenArtifact.abi,
          signer
        );
        setQseToken(token);
      }

      if (QSE_CROWDSALE_ADDRESS) {
        const crowdsale = new ethers.Contract(
          QSE_CROWDSALE_ADDRESS,
          QSECrowdsaleArtifact.abi,
          signer
        );
        setQseCrowdsale(crowdsale);
        await loadContractData(crowdsale);
      }
    } catch (error) {
      console.error("Error initializing provider and contracts:", error);
    }
  };

  const loadContractData = async (crowdsale: ethers.Contract) => {
    try {
      const rate = await crowdsale.rate();
      setTokenRate(Number(rate));
      const burnRate = await crowdsale.BURN_RATE();
      setBurnRate(Number(burnRate));
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // Disconnected
      setAccount(null);
      setSigner(null);
      setQseToken(null);
      setQseCrowdsale(null);
      setIsConnected(false);
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
      if (provider) {
        provider.getSigner().then((newSigner) => {
          setSigner(newSigner);
          if (QSE_TOKEN_ADDRESS) {
            setQseToken(
              new ethers.Contract(
                QSE_TOKEN_ADDRESS,
                QSETokenArtifact.abi,
                newSigner
              )
            );
          }
          if (QSE_CROWDSALE_ADDRESS) {
            const crowdsale = new ethers.Contract(
              QSE_CROWDSALE_ADDRESS,
              QSECrowdsaleArtifact.abi,
              newSigner
            );
            setQseCrowdsale(crowdsale);
            loadContractData(crowdsale);
          }
        });
      }
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!provider) return;

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      handleAccountsChanged(accounts);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const buyTokens = async (ethAmount: string, email: string) => {
    // email unused in contract
    if (!signer || !qseCrowdsale) {
      return {
        success: false,
        message: "Wallet not connected or contract not initialized",
      };
    }

    try {
      const weiAmount = ethers.parseEther(ethAmount);
      const tx = await qseCrowdsale.buyTokens({
        value: weiAmount,
        gasLimit: 300000, // Match MetaMask’s estimate
      });
      const receipt = await tx.wait();
      return { success: true, message: `Transaction: ${receipt.hash}` };
    } catch (error: any) {
      console.error("Buy Tokens Error:", error);
      return { success: false, message: error.message || "Transaction failed" };
    }
  };

  const value = {
    provider,
    signer,
    account,
    chainId,
    qseToken,
    qseCrowdsale,
    connectWallet,
    buyTokens,
    isConnecting,
    isConnected,
    tokenRate,
    burnRate,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <Web3ContextProvider>{children}</Web3ContextProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
