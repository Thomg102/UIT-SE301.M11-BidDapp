import React, {useState, useRef, useEffect} from 'react';
import Header from "../../components/Header/index";
import { productList } from "../../virtualData/productList";
import PaypalSend from '../../assets/js/connect-paypal';
import Popup from "../../components/Popup";
import Web3 from 'web3';
import Marketplace from '../../contracts/MarketPlace.json';
import Art from '../../contracts/Art.json'
import {MARKETPLACE_ADDR, ART_ADDR} from '../../config/config.json';
import { useAlert } from 'react-alert';
import { Redirect } from "react-router-dom";

const ProductDetail = ({ match }) => {
    const alert = useAlert()
    const [_product, setProduct] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isETH, setIsETH] =useState(false);
    const componentMounted = useRef(true);
    const [redirect, setRedirect] = useState(false);
    const [disable, setDisable] =useState(false);

    const getapi = async(url) =>{
        const response = await fetch(url);
        const data = response.json();
        return data
    }

    useEffect(async() => {
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const product = await contract.methods.tokenIdToProduct(match.params.id).call()
        const uri = await artContract.methods.tokenURI(match.params.id).call();
        const productMetadata = await getapi(uri);
        const ownerof= await artContract.methods.ownerOf(product.tokenId).call();
        if (!product.selling || ownerof.toUpperCase() == window.localStorage.account.toUpperCase()){
            setDisable(true)
            if (!product.selling) alert.show("This product's owner haven't bought yet!")
            if (ownerof.toUpperCase() == window.localStorage.account.toUpperCase()) alert.show("You are this product's owner!")
        } 
        if (componentMounted.current){
            setProduct({ 
                id: product.tokenId,
                image: productMetadata.imgUrl,
                name: productMetadata.name,
                shortDesc: productMetadata.shortDes,
                price: product.price/Math.pow(10,18),
                createdAt: product.timestamp,
                endDate: 'April 18, 2022 at 10:21am +07',
                creator: product.creator,
                owner: ownerof,
                description: productMetadata.des
            })
        }
        console.log("hello")

        return () => {
            componentMounted.current =false;
        };
    }, []);
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggleETH = (bool)=>{
        setIsETH(bool);
    }
    const onBuy = () => {
        
        PaypalSend({
            itemName:_product.name,
            destinationEmail:"testing_seller@example.com", // PASSWORD: testing_seller
            sourceEmail:"testing_buyer@example.com",       // PASSWORD: testing_buyer
            currency:"USD",
            amount:"0.01",
            onComplete: async()=>{
                const web3 = new Web3(window.ethereum);
                const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
                const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
                const product = await contract.methods.tokenIdToProduct(match.params.id).call()
                const uri = await artContract.methods.tokenURI(match.params.id).call();
                await contract.methods.buyWithCurrency(product.tokenId, Math.random.toString()).send({
                    from: window.localStorage.account,
                    gas: 5500000
                }).on("transactionHash", hash => {
                    console.log(hash)
                    alert.show('Creating..... ' + hash)
                })
                .on("receipt", async (receipt) => {
                    console.log("receipt: " + receipt);
                    alert.show("Buy successfully!")
                    setRedirect(true)
                })
                .on("error", () => {
                    alert.show("Something with wrong.....")
                });
            }
        });
    }

    const onBuyETH = async()=>{
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const product = await contract.methods.tokenIdToProduct(match.params.id).call()
        const uri = await artContract.methods.tokenURI(match.params.id).call();
        await contract.methods.buyWithETH(product.tokenId).send({
            from: window.localStorage.account,
            gas: 5500000,
            value: product.price
        }).on("transactionHash", hash => {
            alert.show('Creating..... ' + hash)
        })
        .on("receipt", async (receipt) => {
            console.log("receipt: " + receipt);
            alert.show("Buy successfully!")
            setRedirect(true)
        })
        .on("error", () => {
            alert.show("Something with wrong.....")
        });
    }
    
    return (
        <div>
            { _product && 
                <div className="container detail">
                    <div className="row gx-5">
                        <div className="col-6">
                            <div class="card detail__img">
                                <div class="p-0 card-body border-top">
                                    <img src={_product.image} className="card-img-top img-fluid" alt={_product.name} />
                                </div>
                            </div>

                            <div class="card mt-5">
                                <div class="card-body border-top  detail__catalog-content">
                                    <p class="card-text"><b>Creator:</b> {_product.creator}</p>
                                </div>
                                <div class="card-body border-top  detail__catalog-content">
                                    <p class="card-text"><b>Current owner:</b> {_product.owner}</p>
                                </div>
                            </div>

                            <div class="card mt-5">
                                <div class="card-header detail__catalog-title">
                                    Description
                                </div>
                                <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                    <p class="card-text">{_product.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <h1 href="#" className="detail__name link-primary">{_product.name}</h1>
                            <p className="detail__shortDesc mt-4">{_product.shortDesc}</p>
                            <p className="detail__owner mt-5 mb-5">
                                <span className="me-2">Owned by</span> 
                                <a href="#" className="link-primary">@Thomnd</a>
                            </p>
                            <div class="card">
                                <div class="card-header detail__endDate">
                                    Sale ends {_product.endDate}
                                </div>
                                <div class="card-body border-top pt-4 pb-5">
                                    <p class="card-text detail__price-title">Current price</p>
                                    <div className="d-flex align-items-center">
                                        <img className="detail__eth-icon me-3" src={_product.isETHOnPolygon ? "https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456.svg" : "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"} />
                                        <span class="card-text detail__price">{_product.price}</span>
                                    </div>
                                    
                                    <button class="btn btn-primary detail__cta-buy text-white mt-4" onClick={()=>{togglePopup(); toggleETH(false)}} width="175" disabled={disable}>Buy (USD)</button>
                                    <button class="btn btn-primary detail__cta-buy text-white mt-4 ml-4" onClick={()=>{togglePopup(); toggleETH(true)}} width="175" disabled={disable}>Buy (ETH)</button>
                                    <button class="btn btn-primary detail__cta-buy text-white mt-4 ml-4" onClick={togglePopup} style={{width: "175px" }} disabled={disable}>Offer</button>
                                    
                                    
                                    { isOpen && (isETH?<Popup handleClose={togglePopup} onBuy={onBuyETH} isETH={isETH} />:<Popup handleClose={togglePopup} onBuy={onBuy} isETH={isETH} />)}
                                    {
                                        redirect && <Redirect to={"/product/" + match.params.id} />
                                    }
                                </div>
                            </div>
                            
                                    <div class="card mt-5">
                                        <div class="card-header detail__catalog-title">
                                            Offer List
                                        </div>
                                        <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                            <p class="card-text">Offer</p>
                                        </div>
                                        <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                            <p class="card-text">Offer</p>
                                        </div>
                                        <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                            <p class="card-text">Offer</p>
                                        </div>
                                        <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                            <p class="card-text">Offer</p>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductDetail;
