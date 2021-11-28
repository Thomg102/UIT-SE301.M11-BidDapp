import React, {useState, useEffect} from 'react';
import Header from "../../components/Header/index";
// import { productList } from "../../virtualData/productList";
import Popup from "../../components/Popup";
import Web3 from 'web3';
import Marketplace from '../../contracts/MarketPlace.json';
import Art from '../../contracts/Art.json'
import {MARKETPLACE_ADDR, ART_ADDR} from '../../config/config.json';

const ProductDetail = ({ match }) => {
    const [_product, setProduct] = useState({id: ""});
    const [isOpen, setIsOpen] = useState(false);

    async function getapi(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    useEffect(async() => {
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const product = await contract.methods.tokenIdToProduct(match.params.id).call()
        const uri = await artContract.methods.tokenURI(match.params.id).call();
        const productMetadata = await getapi(uri);
        setProduct({ 
            id: product.tokenId,
            image: productMetadata.imgUrl,
            name: productMetadata.name,
            shortDesc: productMetadata.shortDes,
            price: product.price/Math.pow(10,18),
            createdAt: product.timestamp,
            endDate: 'April 18, 2022 at 10:21am +07',
            creator: product.creator
        })
        console.log("hello")

        return () => {
        };
    }, []);
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
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
                                <div class="card-header detail__catalog-title">
                                    Description
                                </div>
                                <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                    <p class="card-text">{_product.discription}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <a href="#" className="detail__name link-primary">{_product.name}</a>
                            <p className="detail__shortDesc mt-4">{_product.shortDesc}</p>
                            <p className="detail__owner mt-5 mb-5">
                                <span className="me-2">Owned by</span> 
                                <a href="#" className="link-primary">{_product.owner}</a>
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
                                    <button class="btn btn-primary detail__cta-buy text-white mt-4" onClick={togglePopup} >Buy now</button>
                                    { isOpen && <Popup handleClose={togglePopup} />}
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
