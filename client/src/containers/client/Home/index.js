import React from 'react'
import Navbar from '../../../components/client/Navbar/index'
import ProductCard from '../../../components/client/ProductCard/index'
import Footer from '../../../components/client/Footer/index'

const index = () => {
    return (
        <>
            <Navbar/>
            <section className="home__menu">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="section-heading line-after">
                                Menu
                            </h2> 
                        </div>
                    </div>
                    <div className="row row-cols-3">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default index
