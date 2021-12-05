import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import Product from '../../components/Product/index';
// import { productList } from "../../virtualData/productList";
import Header from "../../components/Header/index";
import Filter from "../../components/Filter/index";
import Web3 from 'web3';
import Marketplace from '../../contracts/MarketPlace.json';
import Art from '../../contracts/Art.json'
import { MARKETPLACE_ADDR, ART_ADDR } from '../../config/config.json';
import CircularProgress from "@material-ui/core/CircularProgress";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [fetchData, setFetch] = useState(true);
    const componentMounted = useRef(true);

    const getapi = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    useEffect(async () => {
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const totalSupply = await artContract.methods.totalSuply().call();
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const arr = [];
        for (let i = 1; i <= totalSupply; i++) {
            const product = await contract.methods.tokenIdToProduct(i).call()
            const uri = await artContract.methods.tokenURI(i).call();

            const productMetadata = await getapi(uri);
            const obj = {
                id: product.tokenId,
                image: productMetadata.imgUrl,
                name: productMetadata.name,
                shortDesc: productMetadata.shortDes,
                price: product.price / Math.pow(10, 18),
                createdAt: product.timestamp,
                endDate: 'April 18, 2022 at 10:21am +07',
                creator: product.creator
            }
            arr.push(obj);

        }
    }, [])
    return (
        <>
            <div className="mt-5">
                <div className="row gx-4 m-0 pl-3 pr-3">
                    <div className="col-3 pr-5 pl-0">
                        <Filter></Filter>
                    </div>
                    <div className="col-9 p-0">
                        <div className="row justify-content-between m-0">
                            {
                                fetchData ? (<CircularProgress style={{margin: '100px auto'}} />) :
                                    products.map((product, index) => (
                                        <Product
                                            {...product}
                                            key={index}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductList
