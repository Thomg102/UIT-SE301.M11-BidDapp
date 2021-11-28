import React, { useState } from 'react'
import ProductFormFields from "../../components/ProductFormFields/index"
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import Marketplace from '../../contracts/MarketPlace.json';
import Art from '../../contracts/Art.json'
import {MARKETPLACE_ADDR, ART_ADDR} from '../../config/config.json';
import { useAlert } from 'react-alert'
import { Redirect } from "react-router-dom";

let client = create('https://ipfs.infura.io:5001/api/v0');
let web3;
const Index = () => {
    const alert = useAlert()
    const [fileUrl, updateFileUrl] = useState(``)
    const [account, setAccount] = useState("Connect to wallet");
    const [redirect, setRedirect] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            name: e.target.elements.productName.value,
            shortDes: e.target.elements.productShortDesc.value,
            des: e.target.elements.productDesc.value,
            imgUrl: document.getElementsByClassName('fileUrl')[0].innerText
        }
        if (window.ethereum != undefined) {
            web3 = new Web3(window.ethereum);
            if (window.localStorage.account !== undefined)
                await window.ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
                    let s1 = result[0].slice(0, 5);
                    let s2 = result[0].slice(-3);
                    setAccount(s1 + '...' + s2);
                    window.localStorage.account = result[0];
                })
        } else {
            alert.show("Please installing Metamask")
        }

        const added = await client.add(JSON.stringify(obj))
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        console.log(url);
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const object = await contract.methods.createNewProduct(added.path, obj.imgUrl.slice(28), (e.target.elements.productPrice.value*Math.pow(10,18)).toString()).send({
            from: window.localStorage.account,
            gas: 5500000
        })
        .on("transactionHash", hash => {
            alert.show('Creating.....' + hash)
        })
        .on("receipt", async (receipt) => {
            console.log("receipt: " + receipt);
            const totalSupply = await artContract.methods.totalSuply().call();
            await artContract.methods.approve(contract.options.address, totalSupply).send({
                from: window.localStorage.account,
                gas: 5500000
            });
            alert.show("Created and Approve")
            setRedirect(true);
        })
        .on("error", () => {
            alert.show("Something with wrong, such as Img was existed.....")
        });
    }

    return (
        <>
            <div class="d-flex h-100 createProduct">
                <div class="col-2 pl-0 h-100 w-25 fixed-top">

                </div>
                <div class="col-12 w-100 pr-0">

                    <div class="col-10 ml-auto">
                        <div class="d-flex justify-content-between pt-3">
                            <h1 class="text-primary text-uppercase">Add product</h1>
                        </div>
                        <hr />
                        <div class="ml-3">
                            <form enctype="application/x-www-form-urlencoded" class="needs-validation" onSubmit={(e) => handleSubmit(e)}
                                method="POST">
                                <ProductFormFields />
                                <input class="btn btn-success pt-2 md-2 mb-5 submit" type="submit" name="submit" id="submitBtn" value="Add" />
                            </form>
                        </div>
                        {
                            redirect && <Redirect to="/products" />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
