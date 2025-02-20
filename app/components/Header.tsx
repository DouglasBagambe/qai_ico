/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState("");

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkIfWalletIsConnected();

    // Setup event listeners for wallet changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  // Handle account changes
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setWalletConnected(false);
      setWalletAddress("");
      setWalletBalance("");
    } else {
      setWalletConnected(true);
      setWalletAddress(accounts[0]);
      fetchWalletBalance(accounts[0]);
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainId: React.SetStateAction<string>) => {
    setChainId(chainId);
    // Refresh page on chain change as recommended by MetaMask
    window.location.reload();
  };

  // Function to check if wallet is already connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        fetchWalletBalance(accounts[0]);

        // Get chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(chainId);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsConnecting(true);

      if (!window.ethereum) {
        alert("Please install a Web3 wallet like MetaMask!");
        setIsConnecting(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
        fetchWalletBalance(accounts[0]);

        // Get chain ID
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(chainId);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Fetch wallet balance without ethers.js
  const fetchWalletBalance = async (address: string) => {
    try {
      if (!window.ethereum) return;

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      // Convert hex balance to decimal and then to ETH (divide by 10^18)
      const balanceInWei = parseInt(balance, 16);
      const balanceInEth = balanceInWei / 1e18;

      setWalletBalance(balanceInEth.toFixed(4));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Disconnect wallet (note: this doesn't actually disconnect the wallet from the site due to Web3 limitations,
  // it just resets our app's state)
  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
    setWalletBalance("");
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Get network name based on chainId
  const getNetworkName = () => {
    switch (chainId) {
      case "0x1":
        return "ETH";
      case "0x89":
        return "MATIC";
      case "0x38":
        return "BNB";
      case "0xa86a":
        return "AVAX";
      default:
        return "ETH";
    }
  };

  return (
    <>
      <nav className="bg-[#040347] px-2 sm:px-4 pb-4 z-[1000] fixed w-full h-[120px]">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="index.html" className="flex items-center">
                <div className="spin"></div>
                <span className="text-white text-xl pl-3">BSECA</span>
              </a>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 bg-[#040347] justify-self-center pb-3 mt-5 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="w-full items-center text-xl justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 cursor-pointer ml-5">
                <li>
                  <a className="items-center text-white justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#tokenomics"
                    className="items-center text-white justify-center space-y-8 md:flex md:space-x-6 md:space-y-0"
                  >
                    Token Info
                  </a>
                </li>
                <li>
                  <a className="items-center text-white justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    Buy
                  </a>
                </li>
                <li>
                  <a
                    href="#value"
                    className="items-center text-white justify-center space-y-8 md:flex md:space-x-6 md:space-y-0"
                  >
                    Values
                  </a>
                </li>
                <li>
                  <a
                    href="#roadmap"
                    className="items-center text-white justify-center space-y-8 md:flex md:space-x-6 md:space-y-0"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  {walletConnected ? (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="px-4 py-2 lg:text-[16px] text-[#00FF00] border-[#008000] border rounded-full flex items-center">
                        <span className="mr-2 md:block hidden">
                          {formatAddress(walletAddress)}
                        </span>
                        <span className="md:ml-2">
                          {walletBalance} {getNetworkName()}
                        </span>
                      </div>
                      <button
                        onClick={disconnectWallet}
                        className="text-red-400 text-sm hover:text-red-600 mt-2 md:mt-0 md:ml-2"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className={`block py-2 lg:text-[16px] px-4 text-[#008000] border-[#008000] border rounded-full hover:bg-[#008000] hover:bg-opacity-10 transition duration-300 ${
                        isConnecting ? "opacity-70" : ""
                      }`}
                    >
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
