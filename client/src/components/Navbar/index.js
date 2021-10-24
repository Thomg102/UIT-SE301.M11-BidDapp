/* eslint-disable eqeqeq */
import React, {useState, useEffect} from "react";
import Web3 from 'web3';
import { MenuItems } from "./MenuItems";

let web3;

const Navbar = ({onSwitch, showAsk}) => {

  const [account, setAccount] = useState("Connect to wallet");
  const [metamask, setMetamask] = useState(true);
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
      const ethereum = window.ethereum;
      if (ethereum != undefined){
        ethereum.on('accountsChanged', function(accounts){
          setAccount(accounts[0]);
          window.localStorage.account=accounts[0];
          if (window.localStorage.account == 'undefined') setAccount("Connect to wallet")
        })
        
      }else{
        setAccount("Connect to wallet")
      }
      if (window.localStorage.account != 'undefined' && typeof window.localStorage.account != 'undefined'){
        setAccount(window.localStorage.account)
      }
      else setAccount("Connect to wallet")
  }, []);

  const loadWeb3 = async ()=>{
    if (window.ethereum != undefined){
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
        setAccount(result[0]);
        console.log(result[0]);
        window.localStorage.account=result[0];
    })
      setMetamask(true);
    }else if(window.web3){
      web3 = new Web3(window.web3.currentProvider);
      setMetamask(true);
    }else{
      setMetamask(false);
    }
  }

  return (
    <nav className="navbar">
      <h1 className="navbar__logo">Logo</h1>
      <div className="navbar__menu-icon" onClick={handleClick}>
        <i className={state ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state ? "navbar__menu navbar__active" : "navbar__menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Navbar;
