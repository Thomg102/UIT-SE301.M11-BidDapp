import React from "react";
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const history = useHistory();

  const {
    id,
    name,
    image,
    shortDesc,
    price,
    isVerifiedCollection,
    isETHOnPolygon,
    leftTime,
  } = props;

  const handleClick = (id) => {
    history.push(`product/${id}`);
  }

  return (
    <div className="card card-product" onClick={e => { handleClick(id) }}>
      <div className="p-0">
        <img src={image} className="card-img-top" alt={name} />
      </div>

      <div className="card-body d-flex justify-content-between">
        <div>
          <p className="card-product__name">{name}</p>
          <p className="card-product__shortDesc">{shortDesc}</p>
        </div>

        <div className="text-right">
          <p className="card-product__price--title">Price</p>
          <div className="d-flex align-items-baseline">
            <div className="me-3">
                <img className="card-product__eth-icon" src={isETHOnPolygon ? "https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456.svg" : "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"} />
            </div>
            <p className="card-product__price">{price}</p>
          </div>
          
          <div className="d-flex align-items-baseline">
            <p>{leftTime && leftTime} left</p>
          </div>
        </div>
      </div>

      <div className="card-footer bg-transparent">
        <div class="card-product__cta">Buy now</div>
      </div>
    </div>
  );
};

export default Product;
