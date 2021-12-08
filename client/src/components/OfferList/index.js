import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Header from "../../components/Header/index";
import { productList } from "../../virtualData/productList";
import PaypalSend from '../../assets/js/connect-paypal';
import Popup from "../../components/Popup";
import Web3 from 'web3';
import Marketplace from '../../contracts/MarketPlace.json';
import Art from '../../contracts/Art.json'
import { MARKETPLACE_ADDR, ART_ADDR } from '../../config/config.json';
import { Redirect } from "react-router-dom";
import InfoPopup from '../../components/InfoPopup';
import IERC20 from '../../contracts/ERC721.json';
import AlertComp from '../AlertComp';
import { error, warning, info, success } from '../../constant/alertBg'

const OfferList = ({ match }) => {
    const [offerList, setOfferList] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState([]);
    const [symbol, setSymbol] = useState([]);
    const [accepted, setAccepted] = useState(false);
    const [ind, setInd] = useState();
    const [check, setCheck] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const enableAlert = (content, type) => {
        setShowAlert(true);
        setAlertContent(content);
        setAlertType(type);
    
        switch(type) {
          case "warning":
            setAlertColor(warning);
            break
          case "success":
            setAlertColor(success);
            break;
          case "error":
            setAlertColor(error);
            break;
          default: 
            setAlertColor(info);
            break;
        }
    
        const timer = setTimeout(resetAlert, 5000);
       return () => clearTimeout(timer);
      }
    
      const resetAlert = () => {
        setShowAlert(false);
        setAlertContent('');
      }

    useEffect(async () => {
        let web3;
        if (window.ethereum != undefined) {
            web3 = new Web3(window.ethereum);
        } else {
            enableAlert("Please install Metamask", 'warning');
        }

        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        // const allowance = await IERC20Contract.methods.allowance(window.localStorage.account, MARKETPLACE_ADDR).call();
        // const balance = await IERC20Contract.methods.balanceOf(window.localStorage.account).call();
        const ownerof = await artContract.methods.ownerOf(match.params.id).call();
        if (ownerof.toUpperCase() != window.localStorage.account.toUpperCase()) {
            setCheck(true);
        }
        const result = await contract.methods.getOffer(match.params.id).call()
            .then((result) => {
                return result
            })
            .catch(err => console.error)
        result.map(async (resu, index) => {
            if (resu.accepted) {
                setAccepted(true);
                setInd(index);
            }
            if (resu.timeout - Math.round(Date.now() / 1000) >=0){
                setCount(prev => [...prev, resu.timeout - Math.round(Date.now() / 1000)])
            }
            else setCount(prev => [...prev, 0])
            const IERC20Contract = await new web3.eth.Contract(IERC20.abi, resu.token20);
            const symbol = await IERC20Contract.methods.symbol().call();
            setSymbol(prev => [...prev, symbol])
        })

        setOfferList(result)
    }, [])

    useEffect(() => {
        if (!accepted) {
            const id = setInterval(() => {
                setCount(prevs => prevs.map(prev => {
                    if (prev > 0)
                        return (prev - 1)
                    else return 0
                }))
            }, 1000)

            return () => {
                clearInterval(id);
            }
        }
    }, [count])

    const handleApprove = async (index) => {
        let web3;
        if (window.ethereum != undefined) {
            web3 = new Web3(window.ethereum);
        } else {
            enableAlert("Please install Metamask", 'warning');
        }
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        // console.log(index)
        await contract.methods.approveOffer(match.params.id, index).send({
            from: window.localStorage.account
        }).on("transactionHash", hash => {
            enableAlert(`Creating..... ${hash}`, 'info');
            window.alert("Please waiting...")
        })
            .on("receipt", async (receipt) => {
                console.log("receipt: " + receipt);
            })
            .on("error", () => {
                enableAlert('Something with wrong', 'error');
            });
    }


    return (
        <div class="card-body border-top detail__catalog-content">
            {showAlert && <AlertComp resetAlert={resetAlert} backgroundColor={alertColor} type={alertType} content={alertContent} />}
            <div class="card-text">
                <div class="container-sm">
                    {
                        (offerList[0] != undefined) ? (
                            offerList.map((offer, index) => (
                                < div class="row" key={index}>
                                    <div class="col-3 addressOfferList">
                                        <p>{offer.bargainer.slice(0, 5) + '...' + offer.bargainer.slice(-3)}</p>
                                    </div>
                                    <div class="col-3 quantityOfferList">
                                        <p>{Number(offer.amount) / Math.pow(10, 18)} {symbol[index]}</p>
                                    </div>
                                    <div class="col-3 timeOfferList">
                                        <p>{count[index]}</p>
                                    </div>
                                    <div class="col-1 approveBtn">
                                        {
                                            check || (
                                                count[index] == 0 || accepted ? (ind == index ? <button class="btn btn-success text-white mt-3 mb-2" disabled>Approved</button> : <button class="btn btn-primary text-white mt-3 mb-2" disabled>Rejected</button>) :
                                                    <button class="btn btn-primary text-white mt-3 mb-2" onClick={() => handleApprove(index)}>Approve</button>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (<p>empty</p>)
                    }

                </div>
            </div>
        </div >
    )
}
export default OfferList;