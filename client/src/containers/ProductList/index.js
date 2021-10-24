import React, {useState} from 'react';
import Product from '../../components/Product/index';
import { productList } from "../../virtualData/productList";
import Header from "../../components/Header/index";
import Filter from "../../components/Filter/index";

const ProductList = () => {
    return (
       <>
            <Header></Header>
            <div>
                <div className = "row">
                    <div className = "col-3">
                        <Filter></Filter>
                    </div>
                    <div className = "col-9">
                        <div className="row justify-content-between">
                            {
                                productList.products.map((product, index) => (
                                    <Product 
                                        {...product} 
                                        key={index}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            
       </>
    )
}

export default ProductList
