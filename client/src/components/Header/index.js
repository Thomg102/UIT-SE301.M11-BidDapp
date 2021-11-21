import React from "react";
const Header = () => {
  
    return (
    <div class="header d-flex justify-content-between">
        <a href="/" className="logo">MarketplaceLogo</a>

        <div className = "search-bar align-self-center">
            <form action="/action_page.php">
                <input type="text" placeholder="Search.."/>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>

        <div class="header-right align-self-center">
            <a href="/products">Products</a>
            <a href="/">Stats</a>
            <a href="/product/create">Create</a>
            <a href="/">
                <i class="fa fa-user" aria-hidden="true"></i>
            </a>
        </div>
    </div> 
    );
  };
  
  export default Header;