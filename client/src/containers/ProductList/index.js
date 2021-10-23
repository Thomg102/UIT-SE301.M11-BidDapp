import React, {useState} from 'react';
import Product from '../../components/Product/index';
import { productList } from "../../virtualData/productList";

const ProductList = () => {
    return (
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
    )
}

export default ProductList
