import React from 'react';
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import './ProductPage.css'

function ProductPage () {
    return (
        <div className="product-page-body">
            <Header/>
            <Product/>
        </div>
    )
}
export default ProductPage