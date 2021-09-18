import React from "react";

const index = () => {
  return (
    <section className="footer">
      <div className="container">
        <a href="/" className="logo">
            <p className="logo__name">Sneaker City</p>
            <p className="logo__tagline">Every step matters.</p>
        </a>
        <div className="footer__info">
          <div className="footer__column">
            <p className="footer__heading">GET IN TOUCH</p>
            <ul className="footer__content">
              <li>
                <i className="fas fa-map-marker-alt footer__content--left"></i>
                <span className="footer__content--right">
                  777 abc, Ho Chi Minh, Vietnam
                </span>
              </li>
              <li>
                <i className="fas fa-phone footer__content--left"></i>
                <span className="footer__content--right">+91 123456789</span>
              </li>
              <li>
                <i className="far fa-envelope footer__content--left"></i>
                <span className="footer__content--right">
                  sneakercity@gmail.com
                </span>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <p className="footer__heading">INFORMATION</p>
            <ul className="footer__content">
              <li>
                <a href="about" className="footer__content--right">
                  About Us
                </a>
              </li>
              <li>
                <a href="return-policy" className="footer__content--right">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <p className="footer__heading">MY ACCOUNT</p>
            <ul className="footer__content">
              <li>
                <a href="account" className="footer__content--right">
                  My Account
                </a>
              </li>
              <li>
                <a href="wishlist" className="footer__content--right">
                  Wish list
                </a>
              </li>
              <li>
                <a href="orders" className="footer__content--right">
                  All Orders
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
