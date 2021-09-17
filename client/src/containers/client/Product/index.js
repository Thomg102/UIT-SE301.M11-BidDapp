import React from 'react'
import Navbar from '../../../components/client/Navbar'
import Footer from '../../../components/client/Footer'
import ProductCard from '../../../components/client/ProductCard'

const index = () => {
    return (
        <>
            <Navbar/>
            <div className="productPage">
                <div className="container">
                    <div className="row">
                        <div className="productPage__sidebar col-sm-3">
                            <aside className="productPage__sidebar__menu">
                                <ul>
                                    <li><a href="#popular">Nổi bật</a></li>
                                    <li><a href="#noi-bat">Nổi bật</a></li>
                                    <li><a href="#noi-bat">Nổi bật</a></li>
                                    <li><a href="#noi-bat">Nổi bật</a></li>
                                    <li><a href="#noi-bat">Nổi bật</a></li>
                                    <li><a href="#noi-bat">Nổi bật</a></li>
                                </ul>
                            </aside>
                        </div>
                        <div className="productPage__content border-right-before col-md-8">
                            <div className="productPage__content__cards">
                                <h2 id="popular">Nổi bật</h2>
                                <div className="row row-cols-3">
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            <Footer/>
        </>
    )
}

export default index
