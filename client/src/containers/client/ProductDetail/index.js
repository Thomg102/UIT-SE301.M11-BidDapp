import React from 'react'
import Navbar from '../../../components/client/Navbar'
import Footer from '../../../components/client/Footer'
import ProductCard from '../../../components/client/ProductCard'

const index = () => {
    return (
        <>
            <Navbar/>
            <section className="productDetail">
                <div className="container">
                    <div className="productDetail__image">
                        <img src={require('../../../assets/pictures/test.jpg').default} alt="featured" />
                    </div>
                    <div className="productDetail__info">
                        <div className="productDetail__info__wrap">
                            <h1 className="line-after">Sản phẩm XXXXXXXX</h1>
                            <div className="productDetail__info__price">50000đ</div>
                            <a href="/buy" className="btn">Mua ngay</a>
                        </div>
                    </div>
                </div>
                <div className="productDetail__related">
                    <div className="container">
                        <div className="row row-cols-3">
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default index
