import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"

import detectEthereumProvider from '@metamask/detect-provider';

import React, { useEffect } from "react";

//import {web3} from "web3-utils";


export default function Home() {
  const { useWeb3React } = require("@web3-react/core");
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const { ethers } = require("ethers");
  const Moralis = require('moralis')


  var Eth = require('web3');

  var ethereum;
  
   useEffect(function mount() {
      function onScroll() {
        console.log("scroll!");
      }
      ethereum = window.ethereum;
      window.addEventListener("scroll", onScroll);

      return function unMount() {
        window.removeEventListener("scroll", onScroll);
      };
    });


  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

//testt

  async function sendTransaction(){

    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA', // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: '0x' + (50000000000000000).toString(16), // Only required to send ether to the recipient from the initiating external account.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
  
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  }
  

  async function sendOne(){
    // sending 0.5 tokens with 18 decimals
      const web3 = await Moralis.enableWeb3();
      //const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const options = {type: "erc20", 
        amount: Moralis.Units.Token("0.05", "2"), 
        receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
        contractAddress: "0x03ff0ff224f904be3118461335064bb48df47938"}
      let result = await Moralis.transfer(options)
  }

    
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  } 

  //fix meeee
  

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <button onClick={sendTransaction} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Pay Here</button>
      <button onClick={sendOne} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Send 5 ONE</button>
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
    </div>
  )
}
