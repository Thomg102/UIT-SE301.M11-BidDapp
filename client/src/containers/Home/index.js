import React, {useState} from 'react'
import Navbar from '../../components/Navbar/index'

const index = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showAsk, setAsk] = useState(true);

    return (
        <>
            <Navbar 
                onSwitch={() => setAsk(!showAsk)}
                showAsk={showAsk}
            />
            <div className="container">
                {
                    showAsk ? (
                    <div className="ask">
                        <div className="ask__container">
                            <p>Create request</p>
                            <div className="ask__section">
                                <div className="eth">
                                    ETH <i className="fa fa-angle-down"></i>
                                </div>
                                <div className="number">
                                    0.0
                                </div>
                            </div>
                            <div className="ask__section">
                                <div className="selectToken">
                                    Select a token <i className="fa fa-angle-down"></i>
                                </div>
                                <div className="number">
                                    0.0
                                </div>
                            </div>
                            <div className="connectWallet">Connect to Wallet</div>
                        </div>
                    </div>) : ( 
                    <div className="bid">
                        <div className="bid__price">
                            <div className="pricebox rise">
                                0.0
                            </div>
                            <div className="pricebox drop">
                                0.0
                            </div>
                        </div>
                        <div className="bid__btnGroup">
                            <div className="eth">
                                ETH <i className="fa fa-caret-down"></i>
                            </div>
                            <div className="selectToken">
                                Select a token <i className="fa fa-caret-down"></i>
                            </div>
                        </div>
                        <div className="bid__details">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Address</th>
                                        <th scope="col">To</th>
                                        <th scope="col">From</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-bottom">
                                        <td><div className="address"></div></td>
                                        <td><div className="to"></div></td>
                                        <td><div className="from"></div></td>
                                        <td><div className="bidBtn">Bid</div></td>
                                    </tr>
                                    <tr className="border-bottom">
                                        <td><div className="address"></div></td>
                                        <td><div className="to"></div></td>
                                        <td><div className="from"></div></td>
                                        <td><div className="bidBtn">Bid</div></td>
                                    </tr>
                                    <tr className="border-bottom">
                                        <td><div className="address"></div></td>
                                        <td><div className="to"></div></td>
                                        <td><div className="from"></div></td>
                                        <td><div className="bidBtn">Bid</div></td>
                                    </tr>
                                    <tr>
                                        <td><div className="address"></div></td>
                                        <td><div className="to"></div></td>
                                        <td><div className="from"></div></td>
                                        <td><div className="bidBtn">Bid</div></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p><i className="fa fa-caret-down"></i></p>
                        </div>
                    </div>)
                }
                
                
            </div>
        </>
    )
}

export default index
