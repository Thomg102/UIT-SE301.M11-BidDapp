// import { userList } from "../../virtualData/userList";
import InfoPopup from "../../components/InfoPopup/index";
import { API_URL } from '../../constant/apiRoutes';
// import Web3 from 'web3';
import axios from 'axios';
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
import IERC20 from '../../contracts/ERC721.json';
import Product from '../../components/Product/index';
import CircularProgress from "@material-ui/core/CircularProgress";

const User = ({ match }) => {
    const [user, setUser] = useState({});
    const [account, setAccount] = useState("Connect to wallet");
    const [currentUser, setCurrentUser] = useState({});
    // const fetchUser = async() => {
    //     const res = await axios.get('https://localhost:5000/:address');
    //     setUser(res.data);
    // }
    // useEffect(() =>{
    //     fetchUser();
    // })

    useEffect(async () => {
        const ethereum = window.ethereum;
        if (ethereum != undefined) {
            ethereum.on('accountsChanged', async (accounts) => {
                setAccount(accounts[0]);
                setCurrentUser(accounts[0]);
                window.localStorage.account = accounts[0];
                if (window.localStorage.account == 'undefined') setAccount("Connect to wallet");

                await axios.post(`${API_URL}/api/users`, {
                    key: accounts[0]
                });
            });

        } else {
            setAccount("Connect to wallet")
        }
        if (window.localStorage.account != 'undefined' && typeof window.localStorage.account != 'undefined') {
            setCurrentUser(window.localStorage.account);
            setAccount(window.localStorage.account);
        }
        else setAccount("Connect to wallet")
    }, []);

    const [products, setProducts] = useState([]);
    const [fetchData, setFetch] = useState(true);
    const componentMounted = useRef(true);

    const getapi = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    useEffect(async () => {
        handleOwnable()
    }, [])

    const handleOwnable = async () => {
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const totalSupply = await artContract.methods.totalSuply().call();
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const list = await contract.methods.getProducListOwnable(match.params.id).call();
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            const uri = await artContract.methods.tokenURI(list[i].tokenId).call();

            const productMetadata = await getapi(uri);
            const obj = {
                id: list[i].tokenId,
                image: productMetadata.imgUrl,
                name: productMetadata.name,
                shortDesc: productMetadata.shortDes,
                price: list[i].price / Math.pow(10, 18),
                createdAt: list[i].timestamp,
                endDate: 'April 18, 2022 at 10:21am +07',
                creator: list[i].creator
            }
            arr.push(obj)
        }
        setFetch(false);
        setProducts(arr)
        console.log(arr)
    }

    const handleCreated = async () => {
        const web3 = new Web3(window.ethereum);
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR);
        const contract = await new web3.eth.Contract(Marketplace.abi, MARKETPLACE_ADDR);
        const list = await contract.methods.getProductListCreated(match.params.id).call();
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            const uri = await artContract.methods.tokenURI(list[i].tokenId).call();

            const productMetadata = await getapi(uri);
            const obj = {
                id: list[i].tokenId,
                image: productMetadata.imgUrl,
                name: productMetadata.name,
                shortDesc: productMetadata.shortDes,
                price: list[i].price / Math.pow(10, 18),
                createdAt: list[i].timestamp,
                endDate: 'April 18, 2022 at 10:21am +07',
                creator: list[i].creator
            }
            arr.push(obj)
        }
        setFetch(false);
        setProducts(arr)
        console.log(arr)
    }

    // useEffect(()=>{
    //     const user = userList.users.filter(user => user.id === match.params.id)[0];
    //     setUser(user);
    // }, []);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <div>
                <div class="bg"></div>
                <div class="avt_img"></div>

            </div>
            <div class="userInfo">
                <p class="fullName">{user.name}</p>
                <button onClick={togglePopup} class="editBtn"> <i class="fa fa-edit"> </i> </button>
                {isOpen && <InfoPopup
                    content={
                        <>
                            <div class="nameField">
                                <p>Name: </p>
                                <input type="text" value={user.name}></input>
                            </div>
                            <div class="emailField">
                                <p>Email: </p>
                                <input type="text" value={user.email}></input>
                            </div>
                            <br />
                            <div class="d-flex justify-content-end">
                                <button class="okBtn">Ok</button>
                                <button onClick={togglePopup}>Cancel</button>
                            </div>

                        </>}
                    handleClose={togglePopup}
                />
                }
                <p class="email">{user.email}</p>
                <p class="keyString">{account}</p>
                <p>Joined {user.joinedDate}</p>

            </div>
            <div class="navigationsOfActions">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item" onClick={handleOwnable}>
                        <a class="nav-link active" data-toggle="tab" href="#collected">Collected</a>
                    </li>
                    <li class="nav-item" onClick={handleCreated}>
                        <a class="nav-link" data-toggle="tab" href="#created">Created</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#activities">Activities</a>
                    </li>

                </ul>

                {/* <!-- Tab panes --> */}
                <div class="tab-content">
                    <div id="collected" class="container tab-pane active">
                        <div className="mt-0">
                            <div className="row gx-4 m-0 pl-3 pr-3">
                                <div className="col-12 p-0">
                                    <div className="row justify-content-around m-0">
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
                    </div>
                    <div id="created" class="container tab-pane fade">
                        <div className="mt-0">
                            <div className="row gx-4 m-0 pl-3 pr-3">
                                <div className="col-12 p-0">
                                    <div className="row justify-content-around m-0">
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
                    </div>
                    <div id="activities" class="container tab-pane fade">
                        <h3>No activities recently</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default User;