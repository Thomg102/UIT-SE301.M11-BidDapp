import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import Header from '../../components/Header/index'
import { productList } from '../../virtualData/productList'
import PaypalSend from '../../assets/js/connect-paypal'
import Popup from '../../components/Popup'
import Web3 from 'web3'
import Marketplace from '../../contracts/MarketPlace.json'
import Art from '../../contracts/Art.json'
import { MARKETPLACE_ADDR, ART_ADDR } from '../../config/config.json'
import { Redirect } from 'react-router-dom'
import InfoPopup from '../../components/InfoPopup'
import IERC20 from '../../contracts/IERC20.json'
import OfferList from '../../components/OfferList/index'
import AlertComp from '../../components/AlertComp';
import { error, warning, info, success } from '../../constant/alertBg'

const ProductDetail = ({ match }) => {
  const [_product, setProduct] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isETH, setIsETH] = useState(false)
  const [isUSD, setIsUSD] = useState(false)
  const [isOffer, setIsOffer] = useState(true)
  const componentMounted = useRef(true)
  const [redirect, setRedirect] = useState(false)
  const [disable, setDisable] = useState(false)
  const [minTime, setMinTime] = useState('2021-04-11T00:00')
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [sell, setSell] = useState(false);

  const getapi = async (url) => {
    const response = await fetch(url)
    const data = response.json()
    return data
  }

  useEffect(() => {
    const dtToday = new Date()
    const maxDate = dtToday.toISOString().substr(0, 10)
    setMinTime(maxDate + 'T' + dtToday.getHours() + ':' + dtToday.getMinutes())
  })

  useEffect(async () => {
    const web3 = new Web3(window.ethereum)
    const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR)
    const contract = await new web3.eth.Contract(
      Marketplace.abi,
      MARKETPLACE_ADDR
    )
    const product = await contract.methods
      .tokenIdToProduct(match.params.id)
      .call()
    const uri = await artContract.methods.tokenURI(match.params.id).call()
    const productMetadata = await getapi(uri)
    const ownerof = await artContract.methods.ownerOf(product.tokenId).call()
    if (
      !product.selling ||
      ownerof.toUpperCase() == window.localStorage.account.toUpperCase()
    ) {
      setDisable(true)
      if (!product.selling) {
        enableAlert("This product's owner haven't bought yet!", 'info');
      }
      if (ownerof.toUpperCase() == window.localStorage.account.toUpperCase()) {
        enableAlert("You are this product's owner!", 'info');
      }
    }
    if (
      !product.selling &&
      ownerof.toUpperCase() == window.localStorage.account.toUpperCase()
    ) {
      setSell(true);
    }
    if (componentMounted.current) {
      console.log()
      setProduct({
        id: product.tokenId,
        image: productMetadata.imgUrl,
        selling: product.selling,
        name: productMetadata.name,
        shortDesc: productMetadata.shortDes,
        price: product.price / Math.pow(10, 18),
        createdAt: product.timestamp,
        endDate: 'April 18, 2022 at 10:21am +07',
        creator: product.creator,
        owner: ownerof,
        description: productMetadata.des,
      })
    }
  }, [])

  const enableAlert = (content, type) => {
    setShowAlert(true);
    setAlertContent(content);
    setAlertType(type);

    switch (type) {
      case "warning":
        setAlertColor(warning);
        break
      case "success":
        setAlertColor(success);
        break;
      case "error":
        setAlertColor(error);
        break;
      default:
        setAlertColor(info);
        break;
    }

    const timer = setTimeout(resetAlert, 5000);
    return () => clearTimeout(timer);
  }

  const resetAlert = () => {
    setShowAlert(false);
    setAlertContent('');
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const toggleETH = (bool) => {
    setIsETH(bool)
  }

  const toggleUSD = (bool) => {
    setIsUSD(bool)
  }

  const toggleOffer = (bool) => {
    setIsOffer(bool)
  }

  const onBuy = () => {
    PaypalSend({
      itemName: _product.name,
      destinationEmail: 'testing_seller@example.com', // PASSWORD: testing_seller
      sourceEmail: 'testing_buyer@example.com', // PASSWORD: testing_buyer
      currency: 'USD',
      amount: '0.01',
      onComplete: async () => {
        const web3 = new Web3(window.ethereum)
        const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR)
        const contract = await new web3.eth.Contract(
          Marketplace.abi,
          MARKETPLACE_ADDR
        )
        const product = await contract.methods
          .tokenIdToProduct(match.params.id)
          .call()
        const uri = await artContract.methods.tokenURI(match.params.id).call()
        await contract.methods
          .buyWithCurrency(product.tokenId, Math.random.toString())
          .send({
            from: window.localStorage.account,
            gas: 5500000,
          })
          .on('transactionHash', (hash) => {
            console.log(hash);
            enableAlert(`Creating..... ${hash}`, 'info');
          })
          .on('receipt', async (receipt) => {
            console.log('receipt: ' + receipt);
            enableAlert("Buy successfully!", 'success');
            setRedirect(true)
          })
          .on('error', () => {
            enableAlert("Something with wrong.....", 'error');
          })
      },
    })
  }

  const onBuyETH = async () => {
    const web3 = new Web3(window.ethereum)
    const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR)
    const contract = await new web3.eth.Contract(
      Marketplace.abi,
      MARKETPLACE_ADDR
    )
    const product = await contract.methods
      .tokenIdToProduct(match.params.id)
      .call()
    const uri = await artContract.methods.tokenURI(match.params.id).call()
    await contract.methods
      .buyWithETH(product.tokenId)
      .send({
        from: window.localStorage.account,
        gas: 5500000,
        value: product.price,
      })
      .on('transactionHash', (hash) => {
        enableAlert(`Creating..... ${hash}`, 'info');
      })
      .on('receipt', async (receipt) => {
        console.log('receipt: ' + receipt);
        enableAlert('Buy successfully!', 'success');
        setRedirect(true)
      })
      .on('error', () => {
        enableAlert('Something with wrong.....', 'error');
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      addressToken: e.target.elements.addressToken.value,
      amount: (e.target.elements.amount.value * Math.pow(10, 18)).toString(),
      time: Math.round(Date.parse(e.target.elements.time.value) / 1000),
    }
    let web3
    if (window.ethereum != undefined) {
      web3 = new Web3(window.ethereum)
    } else {
      enableAlert('Please installing Metamask', 'error');
    }

    const contract = await new web3.eth.Contract(
      Marketplace.abi,
      MARKETPLACE_ADDR
    )
    const artContract = await new web3.eth.Contract(Art.abi, ART_ADDR)
    const IERC20Contract = await new web3.eth.Contract(
      IERC20.abi,
      obj.addressToken
    )
    const allowance = await IERC20Contract.methods
      .allowance(window.localStorage.account, MARKETPLACE_ADDR)
      .call()
    const balance = await IERC20Contract.methods
      .balanceOf(window.localStorage.account)
      .call()
    if (Number(allowance) >= Number(obj.amount)) {
      const object = await contract.methods
        .offer(match.params.id, obj.amount, obj.addressToken, obj.time)
        .send({
          from: window.localStorage.account,
        })
        .on('transactionHash', (hash) => {
          enableAlert(`Creating..... ${hash}`, 'info');
          window.alert('Please waiting...')
          togglePopup()
        })
        .on('receipt', async (receipt) => {
          console.log('receipt: ' + receipt)
          setRedirect(true)
        })
        .on('error', () => {
          enableAlert('Something with wrong, Img was not existed.....', 'error');
        })
    } else if (Number(balance) > Number(obj.amount)) {
      await IERC20Contract.methods
        .approve(MARKETPLACE_ADDR, obj.amount)
        .send({
          from: window.localStorage.account,
        })
        .on('transactionHash', (hash) => {
          window.alert('Vui long cho approve')
        })
        .on('receipt', async (receipt) => {
          console.log('receipt: ' + receipt)
          togglePopup()
        })
        .on('error', () => {
          enableAlert('Something with wrong, not enough money.....', 'error');
        })
      const object = await contract.methods
        .offer(match.params.id, obj.amount, obj.addressToken, obj.time)
        .send({
          from: window.localStorage.account,
        })
        .on('transactionHash', (hash) => {
          enableAlert(`Creating..... ${hash}`, 'info');
          window.alert('Please waiting...')
        })
        .on('receipt', async (receipt) => {
          console.log('receipt: ' + receipt)
          setRedirect(true)
        })
        .on('error', () => {
          enableAlert('Something went wrong, Img was not existed.....', 'error');
        })
    } else {
      window.alert('Khong du tien')
    }
  }

  const handleSell = async () => {
    let web3
    if (window.ethereum != undefined) {
      web3 = new Web3(window.ethereum)
    } else {
      enableAlert('Please installing Metamask', 'error');
    }

    const contract = await new web3.eth.Contract(
      Marketplace.abi,
      MARKETPLACE_ADDR
    )
    await contract.methods.setSellOrNot(match.params.id).send({
      from: window.localStorage.account,
      gas: 5500000
    })
      .on('transactionHash', (hash) => {
        enableAlert(`Creating..... ${hash}`, 'info');
      })
      .on('receipt', async (receipt) => {
        console.log('receipt: ' + receipt);
        enableAlert('Set Sell successfully!', 'success');
        setRedirect(true)
      })
      .on('error', () => {
        enableAlert('Something with wrong.....', 'error');
      })
  }

  return (
    <div>
      {showAlert && <AlertComp resetAlert={resetAlert} backgroundColor={alertColor} type={alertType} content={alertContent} />}
      {_product && (
        <div className="container detail mt-5">
          <div className="row gx-5">
            <div className="col-6">
              <div class="card detail__img">
                <div class="p-0 card-body border-top">
                  <img
                    src={_product.image}
                    className="card-img-top img-fluid"
                    alt={_product.name}
                  />
                </div>
              </div>

              <div class="card mt-5">
                <div class="card-body border-top  detail__catalog-content">
                  <p class="card-text">
                    <b>Creator:</b> {_product.creator}
                  </p>
                </div>
                <div class="card-body border-top  detail__catalog-content">
                  <p class="card-text">
                    <b>Current owner:</b> {_product.owner}
                  </p>
                </div>
              </div>

              <div class="card mt-5">
                <div class="card-header detail__catalog-title">Description</div>
                <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                  <p class="card-text">{_product.description}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <h1 href="#" className="detail__name link-primary">
                {_product.name}
              </h1>
              <p className="detail__shortDesc mt-4">{_product.shortDesc}</p>
              <p className="detail__owner mt-5 mb-5">
                <span className="me-2">Owned by</span>
                <a href="#" className="link-primary">
                  @Thomnd
                </a>
              </p>
              <div class="card">
                <div class="card-header detail__endDate">
                  Sale ends {_product.endDate}
                </div>
                <div class="card-body border-top pt-4 pb-5">
                  <p class="card-text detail__price-title">Current price</p>
                  <div className="d-flex align-items-center">
                    <img
                      className="detail__eth-icon me-3"
                      src={
                        _product.isETHOnPolygon
                          ? 'https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456.svg'
                          : 'https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg'
                      }
                    />
                    <span class="card-text detail__price">
                      {_product.price}
                    </span>
                  </div>

                  <button
                    class="btn btn-primary detail__cta-buy text-white mt-4"
                    onClick={() => {
                      togglePopup()
                      toggleUSD(true)
                      toggleETH(false)
                    }}
                    width="175"
                    disabled={disable}
                  >
                    Buy (USD)
                  </button>
                  <button
                    class="btn btn-primary detail__cta-buy text-white mt-4 ml-4"
                    onClick={() => {
                      togglePopup()
                      toggleETH(true)
                      toggleUSD(false)
                    }}
                    width="175"
                    disabled={disable}
                  >
                    Buy (ETH)
                  </button>
                  <button
                    class="btn btn-primary detail__cta-buy text-white mt-4 ml-4"
                    onClick={() => {
                      togglePopup()
                      toggleETH(false)
                      toggleUSD(false)
                      toggleOffer(true)
                    }}
                    disabled={disable}
                  >
                    Offer
                  </button>

                  {isOpen &&
                    (isETH ? (
                      <Popup
                        handleClose={togglePopup}
                        onBuy={onBuyETH}
                        isETH={isETH}
                        enableAlert={enableAlert}
                      />
                    ) : isUSD ? (
                      <Popup
                        handleClose={togglePopup}
                        onBuy={onBuy}
                        isUSD={isUSD}
                        enableAlert={enableAlert}
                      />
                    ) : (
                      <InfoPopup
                        content={
                          <form
                            enctype="application/x-www-form-urlencoded"
                            class="needs-validation"
                            onSubmit={(e) => handleSubmit(e)}
                            method="GET"
                          >
                            <div>
                              <p>Token Address: </p>

                              <select
                                name="addressToken"
                                style={{ width: '100%' }}
                              >
                                <option
                                  value="0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
                                  selected
                                >
                                  LINK
                                </option>
                                <option value="B">BAT</option>
                                <option value="C">DAI</option>
                              </select>
                            </div>
                            <div>
                              <p>Amount token: </p>
                              <input
                                type="number"
                                name="amount"
                                min="0"
                                placeholder="EX: 1 LINK"
                                max="999"
                                step="any"
                                required
                              ></input>
                            </div>
                            <div>
                              <p>Timeout: </p>
                              <input
                                type="datetime-local"
                                name="time"
                                min={minTime}
                                required
                              ></input>
                            </div>
                            <br />
                            <div class="d-flex justify-content-end">
                              <button class="okBtn">Sumbit</button>
                              <button onClick={togglePopup}>Cancel</button>
                            </div>
                          </form>
                        }
                        handleClose={togglePopup}
                      />
                    ))}
                </div>
              </div>

              <div class="card mt-5">
                <div class="card-header detail__catalog-title">Offer List</div>
                <div class="card-header border-top detail__catalog-content">
                  <div class="container-sm">
                    <div class="row offerLabel">
                      <div class="col-3">User</div>
                      <div class="col-3">Amount</div>
                      <div class="col-3">Timeout</div>
                    </div>
                  </div>
                </div>

                <OfferList match={match} />
                {redirect && <Redirect to={'/product/' + match.params.id} />}
              </div>
              {
                sell && < button
                  class="btn btn-primary detail__cta-buy text-white mt-4"
                  onClick={handleSell}
                > Sell</button>
              }
            </div>
          </div>
        </div>
      )
      }
    </div >
  )
}

export default ProductDetail
