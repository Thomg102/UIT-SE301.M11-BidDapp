import React, {useState, useEffect} from 'react';
import Header from "../../components/Header/index";
import { productList } from "../../virtualData/productList";

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const product = productList.products.filter(product => product.id === match.params.id)[0];
        setProduct(product);
    }, []);

    return (
        <div>
            <Header></Header>
            { product && 
                <div className="container detail">
                    <div className="row mt-5 gx-5">
                        <div className="col-6">
                            <div class="card detail__img">
                                <div class="p-0 card-body border-top">
                                    <img src={product.image} className="card-img-top img-fluid" alt={product.name} />
                                </div>
                            </div>
                            <div class="card mt-5">
                                <div class="card-header detail__catalog-title">
                                    Description
                                </div>
                                <div class="card-body border-top pt-4 pb-5 detail__catalog-content">
                                    <p class="card-text">{product.discription}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <a href="#" className="detail__name link-primary">{product.name}</a>
                            <p className="detail__shortDesc mt-4">{product.shortDesc}</p>
                            <p className="detail__owner mt-5 mb-5">
                                <span className="me-2">Owned by</span> 
                                <a href="#" className="link-primary">{product.owner}</a>
                            </p>
                            <div class="card">
                                <div class="card-header detail__endDate">
                                    Sale ends {product.endDate}
                                </div>
                                <div class="card-body border-top pt-4 pb-5">
                                    <p class="card-text detail__price-title">Current price</p>
                                    <div className="d-flex align-items-center">
                                        <img className="detail__eth-icon me-3" src={product.isETHOnPolygon ? "https://storage.opensea.io/files/265128aa51521c90f7905e5a43dcb456.svg" : "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"} />
                                        <span class="card-text detail__price">{product.price}</span>
                                    </div>
                                    <a href="#" class="btn btn-primary detail__cta-buy text-white mt-4">Buy now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductDetail;
