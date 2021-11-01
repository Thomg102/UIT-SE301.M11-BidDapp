import React, {useState, useEffect} from "react";
import { userList } from "../../virtualData/userList";

const User = ({ match }) => {
    const [user, setUser] = useState(0);

    useEffect(()=>{
        const user = userList.users.filter(user => user.id === match.params.id)[0];
        setUser(user);
    }, []);
    
    return(
        <div>
            <div>
                <img class="bg" src="https://i.ibb.co/sV45CNh/Kiyumie-Photos.jpg" alt="Kiyumie-Photos" border="0"/>
                <img class = "avt_img" src="https://i.ibb.co/sV45CNh/Kiyumie-Photos.jpg" alt="Avatar" border="0"/>
            </div>    
            <div class = "userInfo">
                    <p class = "fullName">{user.name}</p>
                    <p class = "keyString">{user.key}</p>
                    <p>Joined {user.joinedDate}</p>
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
                        <a class="nav-link" data-toggle="tab" href="#favorited">Favorited</a>
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
                    <div id="favorited" class="container tab-pane fade">
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