import React from 'react';
const Filter = () => {
    return(
        <div className = "FilterBar">
            <header>
                <i className = "fa fa-filter"></i> Filter
            </header>

            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Status
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                            <label class="container">Buy Now
                                <input type="checkbox"/>
                            </label>
                            <label class="container">On Auction
                                <input type="checkbox"/>
                            </label>
                            <label class="container">New
                                <input type="checkbox"/>
                            </label>
                            <label class="container">Has Offers
                                <input type="checkbox"/>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Price
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    Choose price
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <p> US Dollars </p>
                                    <p> Ehter (ETH) </p>
                                </div>
                            </div>
                            <div className = "minmaxInput d-flex justify-content-between">
                                <input type = "text" id = "min" placeholder = "Min"/> 
                                <p>to</p>
                                <input type = "text" id = "max" placeholder = "Max"/>
                            </div>
                            <button type="button" class="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Chains
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="card-body">
                                <label class="container">Ethereum
                                    <input type="checkbox"/>
                                    
                                </label>
                                <label class="container">Polygon
                                    <input type="checkbox"/>
                                    
                                </label>
                                <label class="container">Klaytn
                                    <input type="checkbox"/>
                                    
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;