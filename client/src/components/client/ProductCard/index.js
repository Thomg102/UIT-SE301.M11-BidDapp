import React from 'react'

const ProductCard = (props) => {
    return (
        <div className="col">
            <div className="productCard">
            <div className="productCard__image">
                <a href="/product/view">
                    <img src={require('../../../assets/pictures/test.jpg').default} alt="Product"/>
                </a>
            </div>
            <div className="productCard__info">
                <h3>
                    <a href="/">
                        Tên sản phẩm tại đây
                    </a>
                </h3>
                <div className="productCard__price">50000đ</div>
                <div className="productCard__button__group">
                    <a href="/" className="btn">
                        MUA NGAY
                    </a>
                    <a href="/" className="btn">
                        TÌM HIỂU THÊM
                    </a>
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default ProductCard
