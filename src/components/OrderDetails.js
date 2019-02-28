import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OrderDetails.css'
//import logo from '../images/pos.png';

/* Product */
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.quantity,
      id: this.props.productId
    };
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  add() {
    this.setState({
      qty: this.state.qty + 1
    });
    this.props.handleTotal(this.props.price);
  }

  subtract() {
    this.setState({
      qty: this.state.qty - 1
    });
    this.props.handleTotal(-this.props.price);
    //console.log(this.state.qty);
  }

  deleteProduct() {
    this.props.delProduct({
      id: this.state.id,
      name: this.props.name,
      price: this.props.price,
      quantity: this.state.qty
    });
    //this.state.qty=this.props.quantity;
  }

  componentDidMount() {
    console.log('this state=', this.state);

  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    console.log("next props", nextProps)
    // if (nextProps.quantity !== this.props.quantity && this.state.id === nextProps.productId) {
    //   this.setState({ qty: nextProps.quantity });
    // }
  }



  render() {


    //   console.log("inside product render",this.state.id);
    //   console.log('this state quantity:',this.state.qty);
    //   console.log('this props quantity:',this.props.quantity);
    //  // console.log('inside product will mount');
    let temp = ({
      _id: '',
      name: this.props.name,
      price: this.props.price,
      image: this.props.image,
      info: 'new product',
      quantity: this.props.quantity

    });

    //edit the quantity

    axios.post('/search/order/edit', {
      id: this.props.userId,
      _id: this.props.orderId,
      productID: this.state.id,
      quantity: this.state.qty,
      product: temp

    })
      .then(res => {
        //console.log(this.props.match.params.id);
        //this.setState({productList:res.data[0].products});
        //this.setState({total:res.data[0].total});
        //console.log(res.data);
        if (this.state.id == null) {
          this.setState({ id: res.data });
        }

      })
      .catch(err => {
        console.log('error occured!');
      });


    return (

      <div className='card col-sm' style={{ backgroundColor: '#e5e7e9e7', marginTop: '40px', marginBottom: '30px', marginLeft: '0px' }}>
        <div style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '0px' }}>
          <div className="row form-group" >
            <div className="col-sm-10">
              <h4><b>{this.props.name} : ${this.props.price}</b></h4>
            </div>
            <div className="col-sm-11 text-right" style={{ marginTop: '-20px' }}><h5><b>Quantity: {this.state.qty}</b></h5></div>
          </div>
          <img
            style={{ backgroundColor: '', opacity: 1 }}
            width={120}
            height={100}
            className="align-self-start mr-3"
            src={this.props.image}//
            alt="Generic placeholder"
          />

          <div className="row btn-toolbar">

            <div className="col-11 text-right">
              <button className="btn btn-outline-primary" style={{ backgroundColor: 'blue', color: 'white', opacity: 0.7, marginRight: '10px' }} onClick={this.add} disabled={this.state.qty > 4}>
                +1
              </button>
              <button className="btn btn-outline-primary" style={{ backgroundColor: 'green', color: 'white', opacity: 0.7 }} onClick={this.subtract} disabled={this.state.qty < 2}>
                -1
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-outline-primary" style={{ backgroundColor: 'red', color: 'white' }} onClick={this.deleteProduct}>
                Delete
              </button>
            </div>

          </div>

          <hr />
        </div>
      </div>
    );
  }
}

/* Total */
class Total extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let total = this.props.total.toFixed(2);
    let tax = (this.props.total * 0.10).toFixed(2);
    let totalIncTax = (+total + +tax).toFixed(2);
    let mystyle = {
      borderTop: "1px solid #ddd",
      marginTop: "10px"
    };

    console.log('inside total render:', { total });

    axios.post('/search/order/total', {
      id: this.props.userId,
      _id: this.props.orderId,
      total: total

    })
      .then(res => {

        //console.log(res.data);
      })
      .catch(err => {
        console.log('error occured!');
      });

    return (
      <div style={{ "marginTop": "30px", "backgroundColor": "#F6F6F6", "padding": "10px" }}>
        <h3 className="row" style={{ fontWeight: 400 }}>
          <span className="col-6">Total Price:</span>
          <span className="col-6 text-right">${total}</span>
        </h3>
        <h3 className="row" style={{ fontWeight: 400 }}>
          <span className="col-6">Tax (10%):</span>
          <span className="col-6 text-right">${tax}</span>
        </h3>
        <h3 className="row" style={mystyle}>
          <span className="col-6">Total inc tax:</span>
          <span className="col-6 text-right">${totalIncTax}</span>
        </h3>

      </div>
    );
  }
}

/* ProductForm */
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.item = {
      name: 'Shoes',
      price: 150,
      qty: 0,
      id: '',
      image: 'http://pluspng.com/img-png/nike-shoe-png-nike-running-shoes-png-image-transparent-free-download-1200.png'

    };
    this.qtyOptionsArray = [
      { key: 0, value: 0, label: 0 },
      { key: 1, value: 1, label: 1 },
      { key: 2, value: 2, label: 2 },
      { key: 3, value: 3, label: 3 },
      { key: 4, value: 4, label: 4 },
      { key: 5, value: 5, label: 5 }];
    this.productOptionsArray = [
      // {key:1,value:'',price:0},
      { key: 2, value: 'Shoes', price: 150 },
      { key: 3, value: 'T-Shirt', price: 30 },
      { key: 4, value: 'Trouser', price: 25 },
      { key: 5, value: 'Cap', price: 10 },
      { key: 6, value: 'Watch', price: 50 },
      { key: 7, value: 'Shirt', price: 20 }

    ];
    this.prices = {
      'Shoes': 150,
      'T-Shirt': 30,
      'Trouser': 25,
      'Cap': 10,
      'Watch': 50,
      'Shirt': 20
    }
    this.images = {
      'Shoes': 'http://pluspng.com/img-png/nike-shoe-png-nike-running-shoes-png-image-transparent-free-download-1200.png',
      'T-Shirt': "https://3.imimg.com/data3/IP/PV/MY-10556739/men-t-shirts-250x250.png",
      'Trouser': 'http://www.transparentpng.com/download/trouser/trouser-png-transparent-image--0.png',
      'Cap': 'http://pngimg.com/uploads/cap/cap_PNG5673.png',
      'Watch': 'http://pngimg.com/uploads/watches/watches_PNG9881.png',
      'Shirt': 'http://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8109.png'

    }
  }
  submit(e) {
    e.preventDefault();

    var product = {
      name: this.item.name,
      price: Number(this.item.price),// Number(this.refs.price.value)
      info: this.refs.info.value,
      quantity: Number(this.item.qty),
      image: this.item.image,
    };
    console.log(product.name, 'pro name');
    if (product.name === '') {
      alert("Please Select the Product!.");

    } else if (product.quantity === 0) {
      alert("Quantity Should be non Zero!.");

    } else {

      this.props.handleProduct(product);
      //this.item.name = "";
      //this.item.price = 0;
      //this.item.qty = 0;
      this.refs.info.value = '';
      this.item.id = 0;
      //this.item.image='';
    }

  }
  onQtyChange(e) {

    console.log(e.target.value);
    this.item.qty = e.target.value;

  }

  onProductChange(e) {

    //console.log(e.target.value);

    this.item.name = e.target.value;
    this.item.price = this.prices[this.item.name];
    this.item.image = this.images[this.item.name];
    this.item.id = e.target.key;
    console.log(this.item.price);

  }


  render() {

    //var getOptionsArray=[1,2,3];

    return (
      <div>

        <form onSubmit={this.submit.bind(this)}>

          <div className='card col-sm'
            style={{ height: '60px', width: '1100px', backgroundColor: '#1d1f1bb4', marginTop: '50px', marginBottom: '50px', marginLeft: '0', color: 'white', opacity: 1 }}>
            <h3 style={{ marginTop: '10px', marginLeft: '20px', color: 'white', opacity: 1 }}>
              <b>Add Items to Cart.</b></h3>
          </div>
          <hr />

          <div
            style={{ height: '320px', width: '1100px', backgroundColor: '#1d1f1bb4', marginTop: '-30px', marginBottom: '20px', marginLeft: '0', color: 'white', opacity: 1 }}    >
            <div className="row form-group" style={{ marginTop: '40px' }}>
              <label className="col-sm-2  col-sm-form-label" style={{ marginTop: '40px', marginLeft: '30px' }}><h5><b>Product:</b></h5></label>

              <div className="col-sm-6" style={{ width: '100px', marginTop: '40px', marginLeft: '0px' }} >
                <select
                  style={{ height: '40px', width: '260px', backgroundColor: 'white', marginTop: '0px', marginBottom: '0px', marginLeft: '0', color: 'black', opacity: 0.9 }}
                  onChange={(e) => this.onProductChange(e)}>
                  {this.productOptionsArray.map(num =>
                    <option
                      key={num.key}
                      value={num.value}>
                      {num.value} :     Price: ${num.price}(per Item)
                </option>
                  )}
                </select>
              </div>
            </div>


            <div className="row form-group">
              <label className="col-sm-2  col-sm-form-label" style={{ marginTop: '20px', marginLeft: '30px' }} ><h5><b>Quantity:</b></h5></label>

              <div className="col-sm-6" style={{ marginTop: '20px', marginLeft: '0px' }}>
                <select
                  style={{ height: '30px', width: '70px', backgroundColor: 'white', marginTop: '0px', marginBottom: '0px', marginLeft: '0', color: 'black', opacity: 0.9 }}
                  onChange={(e) => this.onQtyChange(e)}
                >
                  {this.qtyOptionsArray.map(num =>
                    <option
                      key={num.key}
                      value={num.value}

                    >
                      {num.label}
                    </option>
                  )}
                </select>



                {/* <input
                type="number"
                className="form-control"
                ref="price"
                placeholder="e.g.) 100"
                required
              /> */}
              </div>
            </div>

            <div className="row form-group">
              <label className="col-sm-2  col-sm-form-label" style={{ marginTop: '10px', marginLeft: '30px' }} ><h5><b>Notes:</b></h5></label>
              <div className="col-sm-6" style={{ marginTop: '10px', marginLeft: '0px' }}>
                <input
                  type="text"
                  className="form-control"
                  ref="info"
                  placeholder="e.g.) Additional notes"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="offset-2 col-10">
                <button className="btn btn-outline-primary" style={{ marginTop: '10px', marginLeft: '30px', backgroundColor: '#51c0e6b4', color: 'white' }}>Add Item</button>
              </div>
            </div>

            <hr />
          </div>
        </form>
      </div>
    );
  }
}

/* ProductList */
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      productList: "",
      products: {},
      orderId: '',
      userId: ''
    };

    //this.props.name='yasod'
    //console.log(this.props.auth);

    this.createProduct = this.createProduct.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showProduct = this.showProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);

  }



  componentWillMount() {
    console.log('will mount');
    if (!this.props.auth.isAuthenticated) {


      this.props.history.push('/login');
    }
    else {


      axios.post('/search/individual', {

        id: this.props.auth.user.id,
        _id: this.props.match.params.id
      })
        .then(res => {
          console.log('will mount inside product list');
          this.setState({
            productList: res.data[0].products,
            total: res.data[0].total,
            userId: this.props.auth.user.id,
            orderId: this.props.match.params.id

          });


          //console.log(res.data);
        })
        .catch(err => {
          console.log('error occured!');
        });


    }




  }

  createProduct(product) {
    this.setState({
      total: this.state.total + (product.price * product.quantity),
      product: this.state.productList.push(product)
    });
    console.log(this.state.productList);
  }

  removeProduct(product) {
    axios.post('/search/product/remove', {
      id: this.state.userId,
      _id: this.state.orderId,
      productId: product.id,

    })
      .then(res => {

        console.log(res.data);

      })
      .catch(err => {
        console.log('error occured!');
      });

    console.log(this.state.total - (product.price * product.quantity));
    this.setState({
      total: this.state.total - (product.price * product.quantity),
      productList: ""
    });
    //this.state.productList= this.state.productList.filter(obj => obj.name !== product.name);
    console.log(this.state.productList);
    axios.post('/search/individual', {

      id: this.props.auth.user.id,
      _id: this.props.match.params.id
    })
      .then(res => {
        console.log('will mount inside product list');
        this.setState({
          productList: res.data[0].products,
          //total:res.data[0].total,
          userId: this.props.auth.user.id,
          orderId: this.props.match.params.id

        });


        //console.log(res.data);
      })
      .catch(err => {
        console.log('error occured!');
      });


  }

  calculateTotal(price) {
    this.setState({
      total: this.state.total + price
    });
    console.log(this.state.total);
  }

  showProduct(info) {
    console.log(info);
    alert(info);
  }

  render() {
    document.body.style.backgroundImage = "url('https://citrusbits.com/wp-content/uploads/2017/10/development-company-websites.jpg?id=17132')";
    document.body.style.opacity = 1;


    if (!this.state.productList) return <p>loading...!!!!</p>;
    console.log('render started productList');
    var component = this;
    var myState = component.state;


    console.log('list', this.state.productList);

    var i = 0;
    var products = this.state.productList.map(function (product) {

      console.log('name', product.image);
      console.log('quantity', product.quantity);

      return (

        <Product key={i++}
          name={product.name}
          price={product.price}
          info={product.info}
          quantity={product.quantity}
          handleShow={component.showProduct}
          handleTotal={component.calculateTotal}
          delProduct={component.removeProduct}
          productId={product._id}
          userId={myState.userId}
          orderId={myState.orderId}
          image={product.image}

        />
      );
    });
    //this.state.total=tempTotal;
    //console.log('total is=',{tempTotal});
    console.log('before the return of product list');

    return (
      <div>



        <div><ProductForm handleProduct={this.createProduct} /></div>
        <div>
          <div className='card col-sm'
            style={{ height: '60px', width: '1100px', backgroundColor: '#1d1f1bb4', marginTop: '50px', marginBottom: '50px', marginLeft: '0', color: 'white', opacity: 1 }}>
            <h3 style={{ marginTop: '10px', marginLeft: '20px', color: 'white', opacity: 1 }}
            ><b>My Cart.</b></h3></div>
          {products}

          <Total

            total={this.state.total}
            userId={myState.userId}
            orderId={myState.orderId}
            handleTotal={component.calculateTotal}
          />


        </div>






      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withRouter(ProductList));