import React from 'react';
import {Button} from '@material-ui/core'
import history from '../../history'

const Filter = () => {

    const onApply = (e) => {
        e.preventDefault();
        let i = 0
        let status = []
        let min_price = e.target.min.value
        let max_price = e.target.max.value
        let chains = []
        let path = "/products"
        for (i ; i <= 2; i++) {
            if (e.target.status[i].checked) status.push(i)
            if (e.target.chains[i].checked) chains.push(i)
        }
        if (e.target.status[3].checked) status.push(3)
        path += "?status="
        status.forEach(status => path += status + "+")
        path += "&min_price=" + min_price
        path += "&max_price=" + max_price
        path += "&chains="
        chains.forEach(chain => path += chain + "+")
        history.push(path)
    }

    return (
        <form onSubmit={onApply}>
            <div className="FilterBar">
                <header>
                    <i className="fa fa-filter"></i> Filter
                </header>

                <div className="accordion" id="accordionExample"> 
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Status
                                </button>
                            </h2>
                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <label className="container">Buy Now
                                    <input type="checkbox" name="status" id="buyNow"/>
                                </label>
                                <label className="container">On Auction
                                    <input type="checkbox" name="status" id="onAuction"/>
                                </label>
                                <label className="container">New
                                    <input type="checkbox" name="status" id="new"/>
                                </label>
                                <label className="container">Has Offers
                                    <input type="checkbox" name="status" id="hasOffers"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Price
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Choose price
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <p> US Dollars </p>
                                        <p> Ehter (ETH) </p>
                                    </div>
                                </div>
                                <div className="minmaxInput d-flex justify-content-between">
                                    <input type="text" id="min" placeholder="Min" name="min" />
                                    <p>to</p>
                                    <input type="text" id="max" placeholder="Max" name="max"/>
                                </div>
                                {/* <button type="button" className="btn btn-primary">Apply</button> */}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                                <button className="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Chains
                                </button>
                            </h2>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="card-body">
                                    <label className="container">Ethereum
                                        <input type="checkbox" name="chains" id="eth"/>

                                    </label>
                                    <label className="container">Polygon
                                        <input type="checkbox"name="chains" id="poly" />

                                    </label>
                                    <label className="container">Klaytn
                                        <input type="checkbox" name="chains" id="klaytn"/>

                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button type="submit" variant="contained" id="apply" size="large">APPLY</Button>
        </form>
    );
}

export default Filter;