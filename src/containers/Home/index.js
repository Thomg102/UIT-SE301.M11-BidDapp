/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { makeStyles, Button, Avatar, Divider } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import ImportScriptHook from '../../components/ImportScriptHook/index'
import { ReactComponent as ReactMediaEther } from '../../assets/pictures/media_ether_1.svg'
import { ReactComponent as ReactMediaBitcoin } from '../../assets/pictures/media_bitcoin.svg'
import { ReactComponent as ReactMediaShopping } from '../../assets/pictures/media_shopping.svg'
import { ReactComponent as ReactWindowIcon } from '../../assets/pictures/windows.svg'

const useStyles = makeStyles(() => ({
    mediaEther: {
      width: '550px'
    },
    mediaBitcoin: {
        width: '200px',
        position: 'absolute',
        top: '-250px',
        right: '-50px'
    },
    mediaShopping: {
        width: '500px'
    },
    windowIcon: {
        width: '50px',
        height: 'auto'
    },
    btnDown: {
        fontSize: '15px',
        background: '#F7931A',
        marginTop: '10px'
    },
    avtOrange: {
        background: '#FF5722'
    },
    avtPurple: {
        background: '#673AB7'
    },
    avtGreen: {
        background: '#44A833'
    },
    avtYellow: {
        background: '#F7931A'
    },
    avtRed: {
        background: '#F50015'
    }
  }));

const Home = () => {
    const classes = useStyles();

    ImportScriptHook('./js/vendor.min.js')
    ImportScriptHook('./js/plugins/aos/aos.min.js')
    ImportScriptHook('./js/plugins/slick/slick.min.js')
    ImportScriptHook('./js/plugins/menu/menu.js')
    ImportScriptHook('./js/custom.js')
    return (
        <div data-theme-mode-panel-active data-theme="light" style={{ "font-family": 'Mazzard H' }}>
            <div className="site-wrapper overflow-hidden position-relative">
                <div className="hero-area-l11 position-relative z-index-1 overflow-hidden">
                    <div className="container position-relative">
                        <div className="row position-relative justify-content-center align-items-center">
                            <div className="col-7" data-aos="fade-up" data-aos-duration="500" data-aos-once="true">
                                <div className="content">
                                    <h1 style={{color: '#53A1FC'}}>BlockCommerce</h1>
                                    <div className="row banner-l-11-bottom-content">
                                        <div className="col-10">
                                            <p className="position-relative banner-main-content-l-11">Provide you with a package secured by Blockchain
                                                and Smart Contract to build, manage and revise all aspect between bulding and developing
                                                software for Ethereum ecommerce projects.
                                                <span className="line-left-content"></span>
                                            </p>
                                        </div>
                                        <div className="col-12 flex-y-center ">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.btnDown}
                                            startIcon={<GetApp />}
                                        >
                                            Download for free
                                        </Button>
                                        <div className="col-xl-3 col-lg-4">
                                            <div className="compitable-text border-top d-inline-block">
                                                <p>Compatible with:</p>
                                                <div className="compatible-icon flex-y-center img-grayscale">
                                                    <ReactWindowIcon className={classes.windowIcon} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 position-relative">
                            <ReactMediaBitcoin className={classes.mediaBitcoin} />
                            <ReactMediaShopping className={classes.mediaShopping} />
                        </div>
                    </div>
                    <div className="hero-shape-l11-1 d-none d-md-block">
                        <img src={require("../../assets/pictures/hero-shape-1.svg").default} alt="" />
                    </div>
                </div>
                {/* /* Brand-area -->
                /* Content Area-1 --> */}
                {/* <div className="content-area-l-11-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-start justify-content-center">
                            <div className="col-xl-6 col-md-5 col-md-10" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                                <div className="content-img position-relative z-index-1">
                                </div>
                            </div>
                            <div className="offset-xxl-1 col-xxl-5 col-xl-6 col-lg-7 col-md-9" data-aos="fade-left" data-aos-duration="800" data-aos-once="true">
                                <div className="content section-heading-5">
                                    <h2>
                                        Build Beautiful Landing Pages Faster.
                                    </h2>
                                    <p>Create custom landing pages with BlockCommerce that convert more visitors than any website, no coding
                                        required.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* /* Content Area-2  --> */}
                {/* <div className="content-area-l-11-2">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between justify-content-center">
                            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9 order-lg-1 order-1" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                                <div className="content section-heading-5">
                                    <h2>
                                        Completely Free for Everyone.
                                    </h2>
                                    <div className="d-flex content-l-11-3-card">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="27" viewBox="0 0 32 27">
                                            <g>
                                                <g>
                                                    <g>
                                                        <path className="mypath1" fill="none" stroke="#258aff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="20" stroke-width="2" d="M25.528 25.615v0h5.47v0-5.911c0-.56-.341-1.062-.86-1.27l-5.118-2.05a1.367 1.367 0 0 1-.86-1.267v-1.2a5.445 5.445 0 0 0 2.735-4.711V6.471a5.47 5.47 0 0 0-8.205-4.738">
                                                        </path>
                                                    </g>
                                                    <g>
                                                        <path className="mypath1" fill="none" stroke="#258aff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="20" stroke-width="2" d="M19.367 19.846l-5.14-2.036a1.358 1.358 0 0 1-.864-1.257v-1.192a5.394 5.394 0 0 0 2.747-4.676V7.97c0-2.999-2.46-5.43-5.495-5.43-3.034 0-5.494 2.431-5.494 5.43v2.715a5.394 5.394 0 0 0 2.747 4.676v1.192c0 .555-.342 1.054-.864 1.26l-5.14 2.036c-.52.206-.863.703-.864 1.257v4.51h19.23v0-4.51c0-.555-.342-1.054-.863-1.26z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <div className="content-body">
                                            <h5>Easy setup process</h5>
                                            <p>Editing and customizing Essential Landing is easy and fast.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex content-l-11-3-card">
                                        <img src={require("../../assets/pictures/home/l2/settings.svg").default} alt="icon" />
                                        <div className="content-body">
                                            <h5>Built for real users</h5>
                                            <p>Editing and customizing Essential Landing is easy and fast.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-6 offset-xxl-2 col-xl-6 col-lg-5 col-md-9 order-lg-1 order-0" data-aos="fade-left" data-aos-duration="800" data-aos-once="true">
                                <div className="content-img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* /* Content Area --> */}
                <div className="content-area-l-11-3 position-relative">
                    <div className="container">
                        <div className="row align-items-center justify-content-center justify-content-lg-start">
                            <div className="col-xl-6 col-lg-6 col-md-8 order-lg-1 order-0" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                                <div className="content-img media-ether">
                                    <ReactMediaEther className={classes.mediaEther}/>
                                </div>
                            </div>
                            <div className="offset-xl-1 col-xl-5 col-lg-6 col-md-9 order-lg-1 order-1" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                                <div className="content section-heading-5">
                                    <h2>Rich with features.</h2>
                                    <p>Here are some features that we are developing:</p>
                                    <ul className="list-unstyled pl-0">
                                        <li className="d-flex align-items-center">
                                            <i className="fa fa-check"></i>Smart Contract
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="fa fa-check"></i>Proxy
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="fa fa-check"></i>Lazy Minting
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="fa fa-check"></i>Verification
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /* Feature Area --> */}
                {/* <div className="feature-l-11">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-9 px-lg-12 col-md-12">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 text-center">
                                        <div className="section-heading-5">
                                            <h2>
                                                One Software, Every Solution
                                            </h2>
                                            <p>We designed and tested prototypes that helped identify pain points in the account
                                                creation process. Together, we shaped the new standard.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row feature-l-11-items justify-content-center">
                                    <div className="col-md-6" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-pen-01"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>Easy to Use</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-left" data-aos-duration="800" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-layers-3"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>300+ Blocks</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-office"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>100% Responsive</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-left" data-aos-duration="1000" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-book-open-2"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>Rich Documentation</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-right" data-aos-duration="1200" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-pen-01"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>50+ Ready Pages</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-left" data-aos-duration="1200" data-aos-once="true">
                                        <div className="d-flex ">
                                            <div className="icon-box">
                                                <i className="icon icon-settings-gear-64-2"></i>
                                            </div>
                                            <div className="content-body">
                                                <h5>Quick Setup</h5>
                                                <p>Whether it’s a small internal app or a new for millions of customers, our design and
                                                    development teams.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* /* Testimonial Section --> */}
                {/* <div className="testimonial-area-l-11">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-9" data-aos="fade-down" data-aos-duration="800" data-aos-once="true">
                                <div className="section-heading-5 text-center">
                                    <h2>
                                        30,000+ Customers Trust Us
                                    </h2>
                                    <p>We designed and tested prototypes that helped
                                        identify pain points in the account creation process. Together, we shaped the new standard.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
                            <div className="col-xl-10 col-lg-12 col-md-10">
                                <div className="testimonial-slider-l-11 position-relative">
                                    <div className="single-slide focus-reset">
                                        <div className="testimonial-card">
                                            <p>
                                                <span className="d-inline-block quote-size-1">“</span> You made it so simple. My new site is
                                                so much faster
                                                and easier to work with than my old site. I just choose the page, make the change and
                                                click save. Thanks, guys!”
                                            </p>
                                            <div className="d-flex user-details align-items-center">
                                                <div className="customer-img">
                                                    <img src={require("../../assets/pictures/home/l2/client-img-2.png").default} alt="" />
                                                </div>
                                                <div className="user-identity">
                                                    <h5>Mai Nguyen Duc Tho</h5>
                                                    <span>Founder of BlockCommerce</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-slide focus-reset">
                                        <div className="testimonial-card">
                                            <p>
                                                <span className="d-inline-block quote-size-1">“</span> You made it so simple. My new site is
                                                so much faster
                                                and easier to work with than my old site. I just choose the page, make the change and
                                                click save. Thanks, guys!”
                                            </p>
                                            <div className="d-flex user-details  align-items-center">
                                                <div className="customer-img">
                                                    <img src={require("../../assets/pictures/home/l2/client-img-1.png").default} alt="" />
                                                </div>
                                                <div className="user-identity">
                                                    <h5>Truong Thi Y Lan</h5>
                                                    <span>Founder of BlockCommerce</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-slide focus-reset">
                                        <div className="testimonial-card rounded">
                                            <p>
                                                <span className="d-inline-block quote-size-1">“</span> You made it so simple. My new site is
                                                so much faster
                                                and easier to work with than my old site. I just choose the page, make the change and
                                                click save. Thanks, guys!”
                                            </p>
                                            <div className="d-flex user-details  align-items-center">
                                                <div className="customer-img">
                                                    <img src={require("../../assets/pictures/home/l2/client-img-2.png").default} alt="" />
                                                </div>
                                                <div className="user-identity">
                                                    <h5>Sallie Lawson</h5>
                                                    <span>Founder of Crips</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* /* Newsletter-area start --> */}
                <div className="newsletter-l-11">
                    <div className="container">
                        <div className="row justify-content-center news-l-11-main-bg position-relative">
                            <div className="news-l-11-second-bg w-100 h-100"></div>
                            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-11" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
                                <div className="content text-center">
                                    <h5>Try our free software!</h5>
                                    <h2>Try our free software!</h2>
                                    <p>We designed and tested prototypes that helped identify pain points in the account creation
                                        process. Together, we shaped the new standard.</p>
                                    <div className="btn-area">
                                        <a href="#" className="btn"><i className="fa fa-download d-inline-block"></i> Download free trial</a>
                                    </div>
                                    {/* <span>No credit card required</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newsletter-l-11 mt-150">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5 fs-1 border-top pt-5">My teams</h2>
                    <div className="user-identity d-flex justify-content-center">
                        <div className="d-flex align-items-center">
                            <Avatar className={classes.avtOrange}>MT</Avatar>
                            <p className="member_name">Tho Mai</p>
                        </div>

                        <div className="d-flex align-items-center">
                            <Avatar className={classes.avtPurple}>PD</Avatar>
                            <p className="member_name">Dung Phan</p>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Avatar className={classes.avtYellow}>NL</Avatar>
                            <p className="member_name">Long Nguyen</p>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Avatar className={classes.avtRed}>TL</Avatar>
                            <p className="member_name">Lan Truong</p>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Avatar className={classes.avtGreen}>TL</Avatar>
                            <p className="member_name">Long Tuong</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home
