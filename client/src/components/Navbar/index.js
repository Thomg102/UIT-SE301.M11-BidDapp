import React from "react";

const Navbar = ({onSwitch, showAsk}) => {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">LOGO</h1>
      <div className="navbar__switch">
        <input type="radio" name="slide" id="askSlider" checked/>
        <input type="radio" name="slide" id="bidSlider"/>
        <label for="askSlider" class="askLabel slide" onClick={onSwitch}>ASK</label>
        <label for="bidSlider" class="bidLabel slide" onClick={onSwitch}>BID</label>
        <div class="slider-tab"></div>
      </div>
      <div className="connectWallet">connect to wallet</div>
    </nav>
  );
}

export default Navbar;
