/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      console.log("Starting connection...");
      setIsConnecting(true);

      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Basic connection request
      const accounts = await window.ethereum
        .request({
          method: "eth_requestAccounts",
          params: [],
        })
        .catch((error: any) => {
          console.error("User rejected request:", error);
          throw error;
        });

      console.log("Accounts received:", accounts);

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        console.log("Wallet connected:", accounts[0]);
      }
    } catch (error: any) {
      console.error("Connection failed:", error);
      alert(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <nav className="bg-[#040347] px-2 sm:px-4 pb-4 z-[1000] fixed w-full h-[120px]">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/" className="flex items-center">
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
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-white">
                  Token Info
                </a>
              </li>
              <li>
                <a href="#buy" className="text-white">
                  Buy
                </a>
              </li>
              <li>
                <a href="#value" className="text-white">
                  Values
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-white">
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
  );
};

export default Header;
