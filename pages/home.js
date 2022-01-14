import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"

import detectEthereumProvider from '@metamask/detect-provider';

import React, { useEffect , useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import props from 'prop-types';
import {useLocation} from "react-router-dom";


export default function Home() {
  const { useWeb3React } = require("@web3-react/core");
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const { ethers } = require("ethers");
  //const EthVal = require('ethval')
  const Moralis = require('moralis')
  const BigNumber = require('bignumber.js');

  var Eth = require('web3');
  var Web3 = require('web3');

  var ethereum;

  const [number, setNumber] = useState(0);
  const [addr, setAddr] = useState(0);

  
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


/*   const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  var getAddr = getParameterByName('addr'); */

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

  const onAddrFieldChange = e => {
    setAddr(e.target.value)
  }

  const [sendTok, setSendTok] = React.useState('');

  const handleChange = (event) => {
    setSendTok(event.target.value);
  };


  Moralis.enableWeb3();

  async function sendOne(){

    const transactionParameters = {
      // nonce: '0x00', // ignored by MetaMask
      // gasPrice: gasPriceToHex, // customizable by user during MetaMask confirmation.
      // gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: '0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA', // Required except during contract publications.
      from: ethereum.selectedAddress,
      value: Web3.utils.numberToHex(number+'000000000000000000'), // Only required to send ether to the recipient from the initiating external account.
      //data: mintDataHex, // Optional, but used for defining smart contract creation and interaction.
      chainId: '1666600000' // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  }

  async function sendXya(){
      const options = {type: "erc20", 
        amount: Web3.utils.numberToHex(number+'000000000000000000'), 
        receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
        contractAddress: "0x9b68BF4bF89c115c721105eaf6BD5164aFcc51E4"}
      let result = await Moralis.transfer(options)
  }
  
  async function sendYin(){
        const options = {type: "erc20", 
          amount: Web3.utils.numberToHex(number+'000000000000000000'), 
          receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
          contractAddress: "0xE59AA7f9e91B4Cc6C25D3542CEcb851e0316138c"}
        let result = await Moralis.transfer(options)
    }

    async function sendYang(){
          const options = {type: "erc20", 
            amount: Web3.utils.numberToHex(number+'000000000000000000'), 
            receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
            contractAddress: "0x340042552D19211795dbe55d84FA2E63bc49B890"}
          let result = await Moralis.transfer(options)
      }

      async function sendJewel(){
        const options = {type: "erc20", 
          amount: Web3.utils.numberToHex(number+'000000000000000000'), 
          receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
          contractAddress: "0x72Cb10C6bfA5624dD07Ef608027E366bd690048F"}
        let result = await Moralis.transfer(options)
    }

    async function sendCust(){
      const options = {type: "erc20", 
        amount: Web3.utils.numberToHex(number+'000000000000000000'), 
        receiver: "0xa57bf94fFF257D7D34eDdf1753AbB84aFb096EeA",
        contractAddress: addr}
      let result = await Moralis.transfer(options)
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
      <TextField id="outlined-basic" label="Enter Amount" variant="outlined" margin="normal" type={"number"} onChange={onNumberFieldChange} />
    </Box>
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
      <TextField id="outlined-basic" label="Enter custom token address or leave blank" variant="outlined" margin="normal" type={"string"} onChange={onAddrFieldChange} />
    </Box>
    <Box sx={{ m: 1, width: '25ch'  }}>
    <FormControl fullWidth>
      <InputLabel id="select-token-label">Select Token</InputLabel>
      <Select
        labelId="select-token-label"
        id="select-token"
        value={sendTok}
        label="SendTok"
        onChange={handleChange}
      >
        <MenuItem value={sendOne}>Send ONE</MenuItem>
        <MenuItem value={sendJewel}>Send JEWEL</MenuItem>
        <MenuItem value={sendXya}>Send XYA</MenuItem>
        <MenuItem value={sendYin}>Send YIN</MenuItem>
        <MenuItem value={sendYang}>Send Yang</MenuItem>
        <MenuItem value={sendCust}>Send Custom Token</MenuItem>
      </Select>
    </FormControl>
  </Box>
    <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
  </div>
    
  )
}
