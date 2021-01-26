import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios"
import './TableList.css'

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);



export default function TableList() {
  const [onAdd, setonAdd] = useState(false)
  const [products, setProducts] = useState([])
  const [onEdit, setonEdit] = useState(false)
  const [clickedEdit, setClickedEdit] = useState("")
  const [idProduct, setIdProduct] = useState("")
  const [nameProduct, setNameProduct] = useState("")
  const [imageProduct, setImageProduct] = useState("")
  const [priceProduct, setPriceProduct] = useState("")


  const getProduct = async () => {
    try {
      const res = await axios.get('http://localhost:8080/products');
      setProducts(res.data)
    }
    catch (error) {
      console.error(error);
    };
  }

  useEffect(() => {
    getProduct()
  }, [])

  const onSubmitProduct = () => {
    axios.post('http://localhost:8080/products', {
      id: `${idProduct}`,
      name: `${nameProduct}`,
      image: `${imageProduct}`,
      price: `${priceProduct}`
    })
    .then(res => {
      setProducts(products.find(item => item));
    })
      .catch(error => {
        console.error(error);
      });
  }

  const onSubmitEditProduct = (id) => {
    axios.put(`http://localhost:8080/products/${id}`, {
      id: `${idProduct}`,
      name: `${nameProduct}`,
      image: `${imageProduct}`,
      price: `${priceProduct}`
    })
      .then(res => {
        setProducts(products.find(item => item));
      })
      .catch(error => {
        console.error(error);
      });
  }

  const onChangeIdProduct = (e) => {
    setIdProduct(e.target.value)
  }

  const onChangeNameProduct = (e) => {
    setNameProduct(e.target.value)
  }

  const onChangeImageProduct = (e) => {
    setImageProduct(e.target.value)
  }

  const onChangePriceProduct = (e) => {
    setPriceProduct(e.target.value)
  }

  const onDeleteProduct = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(
        setProducts(products.filter(item => item.id !== id))
      )
      .catch(error => {
        console.error(error);
      });
  }

  const onAddProduct = () => {
    setonAdd(!onAdd)
  }

  const onEditProduct = (id) => {
    setonEdit(!onEdit)
    setClickedEdit(id)
  }

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Product Table</h4>
            <button className="btn btn-primary" onClick={() => { onAddProduct() }}>Add product</button>
            {onAdd ? (<div>
              <form onSubmit={onSubmitProduct}>
                <div className="form-group">
                  <label htmlFor="id">Id</label>
                  <input value={idProduct} onChange={onChangeIdProduct} className="form-control" type="text" placeholder="id" required />

                  <label htmlFor="name">Name</label>
                  <input value={nameProduct} onChange={onChangeNameProduct} className="form-control" type="text" placeholder="name" required />

                  <label htmlFor="image">Image</label>
                  <input value={imageProduct} onChange={onChangeImageProduct} className="form-control" type="text" placeholder="image" required />

                  <label htmlFor="price">Price</label>
                  <input value={priceProduct} onChange={onChangePriceProduct} className="form-control" type="number" placeholder="price" required />
                </div>

                <button className="btn btn-success" type="submit">Add</button>
              </form>
            </div>) : null}
          </CardHeader>
          <CardBody>
            <div className="header-table-product">
              <p className="table-product-id">Id</p>
              <p className="table-product-name">Name</p>
              <p className="table-product-image">Image</p>
              <p className="table-product-price">Price</p>
              <p className="table-product-edit">Edit</p>
              <p className="table-product-delete">Delete</p>
            </div>

            {products.map(item => {
              return (
                <div key={item.id}>
                  <div className="body-table-product" >
                    <p className="table-product-id">{item.id}</p>
                    <p className="table-product-name">{item.name}</p>
                    <div className="table-product-image"><img src={`${item.image}`} alt={`${item.name}`} /></div>
                    <p className="table-product-price">{item.price} VND</p>
                    <div className="table-product-edit">
                      <button className="btn btn-success" onClick={() => onEditProduct(item.id)}>Edit</button>
                    </div>
                    <div className="table-product-delete">
                      <button className="btn btn-danger" onClick={() => onDeleteProduct(item.id)}>X</button>
                    </div>
                  </div>
                  {onEdit && clickedEdit === (item.id) ? (<div>
                    <form onSubmit={() => onSubmitEditProduct(item.id)}>
                      <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input value={item.id} className="form-control" type="text" placeholder="id" disabled />

                        <label htmlFor="name">Name</label>
                        <input value={nameProduct} onChange={onChangeNameProduct} className="form-control" type="text" placeholder="name" required />

                        <label htmlFor="image">Image</label>
                        <input value={imageProduct} onChange={onChangeImageProduct} className="form-control" type="text" placeholder="image" required />

                        <label htmlFor="price">Price</label>
                        <input value={priceProduct} onChange={onChangePriceProduct} className="form-control" type="number" placeholder="price" required />
                      </div>

                      <button className="btn btn-success" type="submit">Update</button>
                    </form>
                  </div>) : null}
                </div>
              )
            })}

          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
