import React, {useState} from 'react';
import Product from '../../components/Product/index';
import { productList } from "../../virtualData/productList";
import Header from "../../components/Header/index";
import Filter from "../../components/Filter/index";

const ProductList = () => {

    
    return (
       <>
            <div>
                <div className = "row gx-4 m-0 pl-3 pr-3">
                    <div className = "col-3 pr-5 pl-0">
                        <Filter></Filter>
                    </div>
                    <div className = "col-9 p-0">
                        <div className="row justify-content-between m-0">
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
