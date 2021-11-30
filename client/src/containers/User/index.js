/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
// import { userList } from "../../virtualData/userList";
import InfoPopup from "../../components/InfoPopup/index";
import { API_URL } from '../../constant/apiRoutes';
// import Web3 from 'web3';
import axios from 'axios';

const User = ({ match }) => {
    const [user, setUser] = useState({});
    const [account, setAccount] = useState("Connect to wallet");
    const [currentUser, setCurrentUser] = useState({});
    const fetchUser = async() => {
        let userAdd = match.params.id;
        const res = await axios.get(`${API_URL}/api/users/` + userAdd);
        setUser(res.data);
    }
    useEffect(() =>{
        fetchUser();
        console.log(user)
    }, [])

    useEffect(async() => {
        const ethereum = window.ethereum;
        if (ethereum != undefined){
          ethereum.on('accountsChanged', async (accounts) => {
            setAccount(accounts[0]);
            setCurrentUser(accounts[0]);
            window.localStorage.account=accounts[0];
            if (window.localStorage.account == 'undefined') setAccount("Connect to wallet");

            await axios.post(`${API_URL}/api/users`, {
              key: accounts[0]
            });
          });

        }else{
          setAccount("Connect to wallet")
        }
        if (window.localStorage.account != 'undefined' && typeof window.localStorage.account != 'undefined'){
          setCurrentUser(window.localStorage.account);
          setAccount(window.localStorage.account);
        }
        else setAccount("Connect to wallet")
    }, []);

    // useEffect(()=>{
    //     const user = userList.users.filter(user => user.id === match.params.id)[0];
    //     setUser(user);
    // }, []);
    
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div>
            <div>
                <div class = "bg"></div>
                <div class = "avt_img">{/*<img src={user[0].avatarImage} alt="avatar" />*/}</div>
               
            </div>    
            <div class = "userInfo">
                    <p class = "fullName">{user[0].name}</p>
                    <button onClick={togglePopup} class = "editBtn"> <i class="fa fa-edit"> </i> </button>
                    {isOpen && <InfoPopup
                        content={
                            <>
                                <div class = "nameField">
                                    <p>Name: </p>
                                    <input type = "text" value = {user[0].name}></input>
                                </div>
                                <div class = "emailField">
                                    <p>Email: </p>
                                    <input type = "text" value = {user[0].email}></input>
                                </div>
                                <br/>
                                <div class="d-flex justify-content-end">
                                    <button class = "okBtn">Ok</button>
                                    <button onClick={togglePopup}>Cancel</button>
                                </div>
                            
                        </>}
                        handleClose={togglePopup}
                        />
                    }
                    <p class = "email">{user[0].email}</p>
                    <p class = "keyString">{account}</p>
                    <p>Joined {user[0].joinedDate}</p>
                    
            </div>  
            <div class = "navigationsOfActions">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#collected">Collected</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#created">Created</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#activities">Activities</a>
                    </li>

                </ul>

                {/* <!-- Tab panes --> */}
                <div class="tab-content">
                    <div id="collected" class="container tab-pane active">
                        <h3>No items here</h3>
                    </div>
                    <div id="created" class="container tab-pane fade">
                        <h3>No items here</h3>
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