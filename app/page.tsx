// FILE: page.tsx

"use client";

import Web3Provider from "./components/Web3Provider";
import Home from "./components/pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";

export default function Page() {
  return (
    <Web3Provider>
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    </Web3Provider>
  );
}
