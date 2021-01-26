import React, { Component } from 'react'
import {actFetchProductsRequest,AddCart} from '../actions/cart'
import {connect} from 'react-redux';
export class Product extends Component {
    componentDidMount(){
        this.props.actFetchProductsRequest();
    }
     
    render() {
        const {_products} = this.props._products;
        if(_products.length>0){
            
           return (
            <div className="row" style={{marginTop:'10px'}}>
            <div className="col-md-12">
                <div className="row">
                    {
                        _products.map((item,index)=>(
                            <div key={index} className="col-md-6 mb-5">
                                <img src={item.image} alt="imageProduct" className="img-resposive" style={{width:'100%',height:'330px',borderRadius:'2rem'}}/>
                                <h5>{item.name}</h5>
                                <h5>{item.price}$</h5>
                                <span className="badge badge-primary" style={{cursor:'pointer'}} onClick={()=>this.props.AddCart(item)}><h4>Add Cart</h4></span>                      
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
            )
        }
        return(
            <div className="row">
                <h2>Loading...!</h2>
            </div>
        )
         
    }
}
 
const mapStateToProps = state =>{
    return {
         _products: state._todoProduct,
       };
}
function mapDispatchToProps(dispatch){
    return{
        actFetchProductsRequest:()=>dispatch(actFetchProductsRequest()),
        AddCart:item=>dispatch(AddCart(item))
      
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)
