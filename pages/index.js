import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"

import detectEthereumProvider from '@metamask/detect-provider';

import React, { useEffect , useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function Home() {
  const { useWeb3React } = require("@web3-react/core");
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const { ethers } = require("ethers");
  //const Moralis = require('moralis')


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
  

  const onNumberFieldChange = e => {
    setNumber(e.target.value)
  }
  
  


  async function sendOne(){

    const transactionParameters = {
      // nonce: '0x00', // ignored by MetaMask
      // gasPrice: gasPriceToHex, // customizable by user during MetaMask confirmation.
      // gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA', // Required except during contract publications.
      from: ethereum.selectedAddress,
      value: '0x' + (5000000000000000000).toString(16), // Only required to send ether to the recipient from the initiating external account.
      //data: mintDataHex, // Optional, but used for defining smart contract creation and interaction.
      chainId: '1666600000', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  }
  

    
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  } 

  

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected, please change to Harmony Mainnet</span>}
      <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
      >
      <TextField id="outlined-basic" label="Enter Amount" variant="outlined" margin="normal" type={"number"}/>
      </Box>
      <button onClick={sendOne} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Send ONE</button>
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
    </div>
  )
}
