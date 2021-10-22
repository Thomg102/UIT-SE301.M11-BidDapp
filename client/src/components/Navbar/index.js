import React, {useState, useEffect} from "react";
import Web3 from 'web3';

let web3;

const Navbar = ({onSwitch, showAsk}) => {

  const [account, setAccount] = useState("Connect to wallet");
  const [metamask, setMetamask] = useState(true);

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
    <React.Fragment>
    <nav className="navbar">
      <h1 className="navbar__logo">LOGO</h1>
      <div className="navbar__switch">
        <input type="radio" name="slide" id="askSlider" checked/>
        <input type="radio" name="slide" id="bidSlider"/>
        <label for="askSlider" class="askLabel slide" onClick={onSwitch}>ASK</label>
        <label for="bidSlider" class="bidLabel slide" onClick={onSwitch}>BID</label>
        <div class="slider-tab"></div>
      </div>
      <button className="connectWallet" onClick={loadWeb3}>{account}</button>
    </nav>
    {!metamask&&(
        <div style={{backgroundColor: "green", position: "absolute", left: "35%", zIndex: "999"}}>
        <h1>Cài Meta Mask đi bạn ơi</h1>
        <h1 className="text-center"><a href="https://metamask.io/download.html">LINK</a></h1>
        </div>
      )}
      </React.Fragment>
  );
}

export default Navbar;
