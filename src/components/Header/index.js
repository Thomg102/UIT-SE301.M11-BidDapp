import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import axios from 'axios';
import { AppBar, Toolbar, TextField, Button, Icon, makeStyles } from '@material-ui/core';
import { API_URL } from '../../constant/apiRoutes';
let web3;

const useStyles = makeStyles(() => ({
  searchBtn: {
    '&:hover': {
      background: 'none'
    },
  },

  searchField: {
    '& *': {
      fontSize: '15px'
    }
  }
}));

const Header = () => {
  const classes = useStyles()

  const [account, setAccount] = useState("connect wallet");
  const [metamask, setMetamask] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(async () => {
    const ethereum = window.ethereum;
    if (ethereum != undefined) {
      ethereum.on('accountsChanged', async (accounts) => {
        let s1 = accounts[0].slice(0, 5);
        let s2 = accounts[0].slice(-3);
        setAccount(s1 + '...' + s2);
        setCurrentUser(accounts[0]);
        window.localStorage.account = accounts[0];
        if (window.localStorage.account == 'undefined') setAccount("connect wallet");

        await axios.post(`${API_URL}/api/users`, {
          key: accounts[0]
        });
      });

    } else {
      setAccount("connect wallet")
    }
    if (window.localStorage.account != 'undefined' && typeof window.localStorage.account != 'undefined') {
      let s1 = window.localStorage.account.slice(0, 5);
      let s2 = window.localStorage.account.slice(-3);
      setCurrentUser(window.localStorage.account);
      setAccount(s1 + '...' + s2);
    }
    else setAccount("connect wallet")
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum != undefined) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
        let s1 = result[0].slice(0, 5);
        let s2 = result[0].slice(-3);
        setAccount(s1 + '...' + s2);
        setCurrentUser(result[0]);
        console.log(result[0]);
        window.localStorage.account = result[0];
      })
      setMetamask(true);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      setMetamask(true);
    } else {
      setMetamask(false);
    }
  }

  return (
    <AppBar color="inherit" position="static" className="mb-5">
      <Toolbar>
        <div class="header d-flex justify-content-between">
          <a href="/" className="logo">
            <img src="https://i.ibb.co/93Zwkd6/Block-Commerce-Logo.png" alt="BlockCommerce Logo" width="50" height="50" /> BlockCommerce
          </a>

          <div class="header-right align-self-center d-flex">
            <div className="search-bar align-self-center">
              <form method="GET" action="/products" >
                <TextField className={classes.searchField} name="query" id="standard-search" type="search" />
                <Button type="submit" className={classes.searchBtn}>
                  <Icon fontSize="large">search</Icon>
                </Button>
              </form>
            </div>

            <a href={require("../../assets/BlockCommerce.pdf").default} target="_blank" rel="noreferrer">Documentation</a>
            <a href="/products?status=&min_price=0&max_price=&chains=">Products</a>
            {/* <a href="/">Stats</a> */}
            <a href="/product/create">Create</a>
            {
              account == "connect wallet" ? <a onClick={loadWeb3}>{account}</a> : <a href={'/user/' + currentUser} onClick={loadWeb3}>{account}</a>
            }
            {metamask || (
              <div>
                <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Please install MetaMask</a>
              </div>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;