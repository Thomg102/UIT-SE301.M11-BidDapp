import React, {useState, useEffect} from "react";
import Web3 from 'web3';

const Navbar = ({onSwitch, showAsk}) => {

  const [account, setAccount] = useState("Connect to wallet");
  const [metamask, setMetamask] = useState(true);

  useEffect(() => {
    loadWeb3();
    loadData();
    if (window.localStorage.account != undefined && window.web3 != undefined)
      setAccount(window.localStorage.account)
  }, [account]);
  
  const loadWeb3 = async ()=>{
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.eth_requestAccounts;
      setMetamask(true);
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      setMetamask(true);
    }else{
      setMetamask(false);
    }
  }

  const loadData = async ()=>{
    if (window.web3){
      const web3 = window.web3;
      const a = await web3.eth.getAccounts((error, result) =>{
        if (result.length != 0 && result[0] !=undefined){
          setAccount(result);
          window.localStorage.account = result;
        }
    });
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
      <button className="connectWallet" onClick={loadData}>{account}</button>
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
