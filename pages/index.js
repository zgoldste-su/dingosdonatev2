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


  if(typeof window !== `undefined`) {
    function getUrlParams() {

      var paramMap = {};
      if (location.search.length == 0) {
        return paramMap;
      }
      var parts = location.search.substring(1).split("&");
    
      for (var i = 0; i < parts.length; i ++) {
        var component = parts[i].split("=");
        paramMap [decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
      }
      return paramMap;
    }


    //aaa
    var params = getUrlParams();
    var getAddr = params['addr']; // or params.id
  }

 

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

  async function sendEth(){
    const options = {type: "erc20", 
      amount: Web3.utils.numberToHex(number+'000000000000000000'), 
      receiver: getAddr,
      contractAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"}
    let result = await Moralis.transfer(options)
  }

  async function sendMatic(){
    const options = {type: "erc20", 
      amount: Web3.utils.numberToHex(number+'000000000000000000'), 
      receiver: getAddr,
      contractAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"}
    let result = await Moralis.transfer(options)
  }

  async function sendOne(){

    const transactionParameters = {
      // nonce: '0x00', // ignored by MetaMask
      // gasPrice: gasPriceToHex, // customizable by user during MetaMask confirmation.
      // gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: getAddr, // Required except during contract publications.
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


      async function sendJewel(){
        const options = {type: "erc20", 
          amount: Web3.utils.numberToHex(number+'000000000000000000'), 
          receiver: getAddr,
          contractAddress: "0x72Cb10C6bfA5624dD07Ef608027E366bd690048F"}
        let result = await Moralis.transfer(options)
    }

    async function sendCust(){
      const options = {type: "erc20", 
        amount: Web3.utils.numberToHex(number+'000000000000000000'), 
        receiver: getAddr,
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
        {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected, please change to Ethereum or Harmony</span>}
        {active ? <span>Sending to <b>{getAddr}</b></span> : <span>Please enter an 0x address in the url after the /?addr=</span>}
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
            <MenuItem value={sendEth}>Send ONE</MenuItem>
            <MenuItem value={sendMatic}>Send MATIC</MenuItem>
            <MenuItem value={sendOne}>Send ETH</MenuItem>
            <MenuItem value={sendJewel}>Send JEWEL</MenuItem>
            <MenuItem value={sendCust}>Send Custom Token</MenuItem>
          </Select>
        </FormControl>
        </Box>
          <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
        </div>
  )
}
