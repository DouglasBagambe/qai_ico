/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useWeb3 } from "./Web3Provider";

interface TokenPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [ethAmount, setEthAmount] = useState<string>("");
  const [qseAmount, setQseAmount] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [burnAmount, setBurnAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  // Web3 context
  const {
    connectWallet,
    buyTokens,
    isConnected,
    isConnecting,
    account,
    tokenRate,
    burnRate,
  } = useWeb3();

  useEffect(() => {
    setErrorMessage("");
  }, [ethAmount, qseAmount]);

  const handleEthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEthAmount(value);

    if (value && !isNaN(parseFloat(value))) {
      const tokens = parseFloat(value) * tokenRate;
      setQseAmount(tokens.toString());
      calculateTokensAfterBurn(tokens);
    } else {
      setQseAmount("");
      setReceiveAmount("");
      setBurnAmount("");
    }
  };

  const handleQseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQseAmount(value);

    if (value && !isNaN(parseFloat(value))) {
      const tokens = parseFloat(value);
      const eth = tokens / tokenRate;
      setEthAmount(eth.toFixed(6));
      calculateTokensAfterBurn(tokens);
    } else {
      setEthAmount("");
      setReceiveAmount("");
      setBurnAmount("");
    }
  };

  const calculateTokensAfterBurn = (totalTokens: number) => {
    const burnTokens = (totalTokens * burnRate) / 100;
    const netTokens = totalTokens - burnTokens;

    setReceiveAmount(netTokens.toFixed(2));
    setBurnAmount(burnTokens.toFixed(2));
  };

  const validatePurchase = (): boolean => {
    if (!isConnected) {
      setErrorMessage("Please connect your wallet first");
      return false;
    }

    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      setErrorMessage("Please enter a valid ETH amount");
      return false;
    }

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePurchase()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await buyTokens(ethAmount, email);

      if (result.success) {
        setPurchaseCompleted(true);
        const hashMatch = result.message.match(
          /Transaction: (0x[a-fA-F0-9]{64})/
        );
        if (hashMatch && hashMatch[1]) {
          setTxHash(hashMatch[1]);
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[2000] px-4">
      <div className="bg-[#0a0a4a] text-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Buy QSE Tokens</h2>

        {!isConnected ? (
          <div className="text-center py-6">
            <p className="mb-4">Connect your wallet to purchase QSE tokens</p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#a42e9a] to-[#5951f6] hover:opacity-90 transition duration-300 ${
                isConnecting ? "opacity-70" : ""
              }`}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        ) : purchaseCompleted ? (
          <div className="text-center py-6">
            <div className="text-green-400 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-medium mb-2">Purchase Successful!</h3>
            <p className="mb-2">You will receive {receiveAmount} QSE tokens</p>
            <p className="text-sm text-gray-400 mb-4">
              {burnAmount} QSE tokens were burned in this transaction
            </p>
            {txHash && (
              <div className="mt-2 p-3 bg-[#151575] rounded-lg text-xs break-all">
                <p className="font-medium mb-1">Transaction Hash:</p>
                <p>{txHash}</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                ETH Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  value={ethAmount}
                  onChange={handleEthInputChange}
                  className="w-full bg-[#1a1a6a] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
                <div className="absolute right-3 top-3 text-gray-300">ETH</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                QSE Token Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={qseAmount}
                  onChange={handleQseInputChange}
                  className="w-full bg-[#1a1a6a] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  required
                />
                <div className="absolute right-3 top-3 text-gray-300">QSE</div>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Exchange Rate: 1 ETH = {tokenRate} QSE
              </div>
            </div>

            {receiveAmount && burnAmount && (
              <div className="mb-4 p-3 bg-[#151575] rounded-lg">
                <h4 className="font-medium mb-2">Transaction Details:</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span>Gross Amount:</span>
                  <span>{parseFloat(qseAmount).toFixed(2)} QSE</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Burn Amount ({burnRate}%):</span>
                  <span className="text-red-400">{burnAmount} QSE</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>You Receive:</span>
                  <span className="text-green-400">{receiveAmount} QSE</span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Connected Wallet:</p>
              <div className="p-2 bg-[#151575] rounded-lg text-sm break-all">
                {account}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Email (for purchase confirmation)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a6a] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-900 bg-opacity-40 text-red-200 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-[#a42e9a] to-[#5951f6] hover:opacity-90 transition duration-300 ${
                isSubmitting ? "opacity-70" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Buy QSE Tokens"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>All transactions are processed on the blockchain.</p>
        </div>
      </div>
    </div>
  );
};

export default TokenPurchaseModal;
