import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.css'
import ShoppingCart from '../../assets/img/shopping-cart.png'
export class Header extends Component {
    render() {
        return (
            <div className="row cart-header">
                <div className="col-md-12">
                    <nav>
                        <ul className="cart-nav">
                            <li className="cart-item" ><Link to="/admin/dashboard" className="nav-link active">Admin</Link></li>
                            <li className="cart-item" ><Link to="/" className="nav-link active">Products</Link></li>
                            <li className="cart-shopping-item"><Link to="/cart" className="nav-link"><img className="shopping-cart-header" src={ShoppingCart} alt="cart" /><p>{this.props.numberCart}</p></Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        numberCart: state._todoProduct.numberCart
    }
}
export default connect(mapStateToProps, null)(Header)
