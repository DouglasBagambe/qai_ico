/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
// import Team from "@/components/Team";

import RoadmapSection from "../RoadmapSection";
import TokenomicsChart from "../TokenomicsChart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUser,
  faGlobe,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState<number | null>(null);

  const handlePDFView = () => {
    const pdfPath = `${window.location.origin}/assets/whitepaper/QAITokenEVCI_Use_Case.pdf`;
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
      <html>
        <head>
          <title>BSECA QAI-Token Whitepaper</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe src="${pdfPath}" type="application/pdf" width="100%" height="100%"></iframe>
        </body>
      `);
    }
  };

  return (
    <>
      <section className="bg-[#040347] text-white lg:pt-[100px] lg:pb-[50px] py-[50px]">
        <div className="max-w-[1300px] mx-auto p-5 pt-[4.5rem]">
          <div className="flex lg:flex-row gap-[80px] flex-col">
            <div className="flex-1">
              <div>
                <h1 className="lg:text-[2.5rem] font-bold text-[1.8rem] pr-7">
                  The Most Securitized & Convenient Wallet To Store Cryptos &
                  NFT's
                </h1>
                <p className="lg:text-[18px]  text-[16px] mt-7 pr-7">
                  Buying cryptos doesn’t have to be hurtful. With BSECA, you
                  will experience a pain-free transaction as we keep the process
                  is simple. Safeguard your wallet and coins while paying the
                  lowest fees ever.
                </p>
                <div className="flex mt-3 md:flex-row flex-col lg:gap-2 gap-5 mt-[20px]">
                  <button
                    onClick={handlePDFView}
                    className="px-6 button-g py-2 rounded-[15px] min-w-[300px] text-center bg-gradient-to-r from-[#a42e9a] to-[#5951f6] hover:opacity-90 transition-opacity"
                  >
                    Whitepaper
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                className="w-full h-[auto]"
                src="/assets/banner.gif"
                width="100%"
                alt="Banner"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#040347] text-white ">
        <div className="max-w-[1200px] mx-auto p-5">
          <div className="grid lg:grid-cols-4 grid-cols-2">
            <div className="text-center lg:mb-0 mb-[50px]">
              <span className="bg-[#5964da] w-[80px] h-[80px] flex justify-center items-center mx-auto mb-3 inline-block px-[20px] py-[20px] rounded-full">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-[30px] text-[#09090a]"
                />
              </span>
              <p className="text-[15px] mb-3">Wallet</p>
              <p>Crypto Wallet</p>
            </div>

            <div className="text-center lg:mb-0 mb-[50px]">
              <span className="bg-[#5964da] w-[80px] h-[80px] flex justify-center items-center mx-auto mb-3 inline-block px-[20px] py-[20px] rounded-full">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[30px] text-[#09090a]"
                />
              </span>
              <p className="text-[15px] mb-3">Exchange</p>
              <p>Built In Exchange</p>
            </div>

            <div className="text-center lg:mb-0 mb-[50px]">
              <span className="bg-[#5964da] w-[80px] h-[80px] flex justify-center items-center mx-auto mb-3 inline-block px-[20px] py-[20px] rounded-full">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-[30px] text-[#09090a]"
                />
              </span>
              <p className="text-[15px] mb-3">Staking</p>
              <p>Stake & Earn</p>
            </div>

            <div className="text-center lg:mb-0 mb-[50px]">
              <span className="bg-[#5964da] w-[80px] h-[80px] flex justify-center items-center mx-auto mb-3 inline-block px-[20px] py-[20px] rounded-full">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-[30px] text-[#09090a]"
                />
              </span>
              <p className="text-[15px] mb-3">Cards</p>
              <p>BSECA Master Cards</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-[#040347] text-white lg:py-[50px] pb-[50px]"
        id="buy"
      >
        <div className="max-w-[1200px] mx-auto p-5">
          <div className="flex lg:flex-row flex-col lg:gap-[150px] gap-[50px]">
            <div className="flex-1 flex justify-center items-center ">
              <img
                src="assets/banner-2.png"
                className=" w-full h-[auto] ball"
              />
            </div>
            <div className="flex-1">
              <div>
                <h1 className="lg:text-[2.5rem] font-bold text-[2rem] pr-7">
                  Why Choose HCISS?
                </h1>
                <p className="lg:text-[18px]  text-[16px] mt-4 pr-7">
                  Health Blockchain Security Services is a Web 3 SECaaS that
                  specializes in the Blockchain Security space. HCISS provides
                  cybersecurity analytic solution services using its Chainlink
                  Decentralized Oracle Node Network called BSECAlink. HCISS was
                  founded with a vision to uplift trust and security throughout
                  the digital spectrum and with that, a group of technical and
                  marketing teams has been established in the USA, Africa and
                  Asia.
                </p>

                <a
                  href=""
                  onClick={() => setShowModal(false)}
                  className="buytoken px-6 py-2 text-white rounded-[15px] lg:min-w-[300px] min-w-[250px] text-center py-3 inline-block mt-[30px] px-[40px]  bg-gradient-to-r from-[#a42e9a] to-[#5951f6]"
                >
                  Buy Token
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-[100px] py-[50px]">
        <div className="max-w-[1300px] mx-auto p-5">
          <h3 className="lg:text-[25px] text-black text-[22px]  mb-[50px] text-center font-bold">
            What is BSECAlink
          </h3>
          <div className="grid lg:grid-cols-4 lg:gap-[80px] gap-[30px] grid-cols-1">
            <div className="text-center">
              <div className="bg-[#313a82] scale-100 hover:scale-110 hover:bg-[#0E34F0] cursor-pointer ease-in duration-500 text-white px-6 pt-8 pb-3 custom-shadow rounded-[20px] h-full md:w-full h-[22rem]">
                <img
                  src="assets/cybersecurity.webp"
                  className="h-[60px] mb-1 inline-block mx-auto"
                />
                <p className="mb-4 text-[20px]">Account Security</p>
                <p className="mb-4 text-[15px] flex text-center  justify-center">
                  Enhance your smart contract’s security by integrating it with
                  two-factor authorization. We enable your smart contracts with
                  an added layer of security to prevent unauthorized
                  transactions.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#313a82] scale-100 hover:scale-110 hover:bg-[#0E34F0] cursor-pointer ease-in duration-500 text-white px-6 pt-8 pb-3 custom-shadow rounded-[20px] h-full md:w-full h-[22rem]">
                <img
                  src="assets/smartcontract.webp"
                  className="h-[60px] mb-1 inline-block mx-auto"
                />
                <p className="mb-1 text-[20px]">
                  Smart Contract Automation and Audit Results
                </p>
                <p className="mb-2 text-[15px]">
                  Streamline user experience and decrease developer downtime by
                  automating your smart contracts with BSECAlink. Increase
                  security and peace of mind through our on-chain audit results.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#313a82] scale-100 hover:scale-110 hover:bg-[#0E34F0] cursor-pointer ease-in duration-500 text-white px-6 pt-8 pb-3 cutom-shadow rounded-[20px] h-full md:w-full h-[22rem]">
                <img
                  src="assets/NFTs.webp"
                  className="h-[60px] mb-1 inline-block mx-auto"
                />
                <p className="mb-3 text-[20px]">NFTs, Gaming, and Randomness</p>
                <p className="mb-4 text-[15px]">
                  Establish trust in your metaverse or NFT gaming project
                  through randomness. We make sure that your application remains
                  truly random, secure, and tamper-proof.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-[#313a82] scale-100 hover:scale-110 hover:bg-[#0E34F0] cursor-pointer ease-in duration-500 text-white px-6 pt-8 pb-3 cutom-shadow rounded-[20px] h-full md:w-full h-[22rem]">
                <img
                  src="assets/graph.webp"
                  className="h-[60px] mb-1 inline-block mx-auto"
                />
                <p className="mb-4 text-[20px]">
                  Graph Database Smart Contract Integration (Neo4J)
                </p>
                <p className="mb-4 text-[15px]">
                  Take your efficiency to the next level by integrating a graph
                  database into your smart contracts. BSECAlink is your link
                  between enterprise-grade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-[#040347] text-white pt-[90px] lg:pb-[70px]"
        id="value"
      >
        <div className="max-w-[900px] mx-auto p-5">
          <h4 className="text-white lg:text-[35px] text-[22px] text-center lg:mb-[50px] mb-[30px]">
            Our Core Values
          </h4>
          <div className="flex lg:flex-row flex-col py-[50px] items-center lg:gap-[150px] gap-[50px]">
            <div className="flex-1">
              <h1 className="lg:text-[2.5rem] lg:text-left text-center uppercase mb-[50px] font-bold text-[2rem] pr-7">
                OUR VISION
              </h1>
              <p className="lg:text-[18px] lg:text-left text-center  text-[16px] mt-4 lg:pr-7">
                BSECA has a vision to simplify fintech, by allowing Crypto to
                Fiat (BSA) transactions done instantaneously and with ease. We
                envision to give bank like features to people without bank
                access.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="assets/rainbow.gif"
                className="lg:h-[300px] h-[250px]"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center py-[50px] lg:gap-[150px] gap-[50px]">
            <div className="flex-1 lg:order-1 order-2">
              <img src="assets/mission1.gif" className="h-[300px]" />
            </div>
            <div className="flex-1 lg:order-2 order-1">
              <h1 className="lg:text-[2.5rem] lg:text-left text-center uppercase mb-[50px] font-bold text-[2rem] pr-7">
                OUR MISSION
              </h1>
              <p className="lg:text-[18px] lg:text-left text-center  text-[16px] mt-4 lg:pr-7">
                BSECA mission is to offer simple, transparent & fast
                transactions within an ecosystem that's created to give people
                the power to move digital value through traditional or crypto
                securely.
              </p>
            </div>
          </div>
          <div className="flex lg:flex-row items-center flex-col pt-[65px] lg:gap-[150px] gap-[50px]">
            <div className="flex-1  ">
              <h1 className="lg:text-[2.2rem]  lg:text-left text-center mb-[50px]  text-[2rem] pr-7">
                Inclusivity
              </h1>
              <p className="lg:text-[18px] lg:text-left text-center text-[16px] mt-4 lg:pr-7">
                At BSECA we put inclusivity at the center of our purpose.
              </p>
            </div>
            <div className="flex-1   ">
              <img src="assets/value.gif" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-[#040347] text-white pt-[6.9rem] lg:pb-[50px]"
        id="tokenomics"
      >
        <h1 className="text-4xl font-bold text-center mb-5">Tokenomics</h1>
        <TokenomicsChart />
      </section>
      <section id="roadmap">
        <RoadmapSection />
      </section>
      <section className="bg-[#040347] text-white pt-[30px] pb-[50px]">
        <div className="max-w-[1700px] mx-auto p-5">
          <h1 className="text-4xl font-bold text-center mb-20">See Us At</h1>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-6 sm:grid-cols-3 ">
            <div>
              <a href="#">
                <img src="assets/slide_1.png" className="w-[150px] mx-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="assets/slide_2.png" className="w-[150px] mx-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="assets/slide_3.png" className="w-[150px] mx-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="assets/slide_4.png" className="w-[150px] mx-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="assets/slide_5.png" className="w-[150px] mx-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="assets/slide_6.png" className="w-[150px] mx-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
