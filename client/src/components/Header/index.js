import React, {useState, useEffect} from "react";
import Web3 from 'web3';

let web3;
const Header = () => {
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
    <div class="header d-flex justify-content-between">
        <a href="/" className="logo">MarketplaceLogo</a>

        <div className = "search-bar align-self-center">
            <form action="/action_page.php">
                <input type="text" placeholder="Search.."/>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>

        <div class="header-right align-self-center">
            <a href="/products">Products</a>
            <a href="/">Stats</a>
            <a href="/">Create</a>
            <a href="/" className="bg-info connectWallet" onClick={loadWeb3}>{account}</a>
        </div>
    </div>
    );
  };

  export default Header;