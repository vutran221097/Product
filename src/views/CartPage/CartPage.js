import React from 'react';
import Header from '../../components/Header/Header'
import Cart from '../../components/ProductCart/ProductCart.js'
import './CartPage.css'
function CartPage () {
    return (
        <div className="cart-page-body">
            <Header/>
            <Cart/>
        </div>
    )
}
export default CartPage