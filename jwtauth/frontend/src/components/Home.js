// Home.js
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import logo from '../images/pos.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import myImg from '../images/background.png';
//import Background from '../images/background.png';
import './Home.css'

// var sectionStyle = {
//     backgroundImage: `url(${Background})`,

// };
//import { imgUrl } from 'https://pngimage.net/wp-content/uploads/2018/05/e-commerce-background-png-3.png'; 
//import {select} from 'react-select'

//import select from 'react-select';
//import myProduct from '../../../backend/models/Product';
// const mainBg = {
//     backgroundImage: `url(${Background})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
// }








class Home extends Component {

    constructor() {
        super();
        this.state = { data: null };
        this.deleteOrder = this.deleteOrder.bind(this);

    }

    componentWillMount() {

        console.log("will mount");
        //console.log(this.state);
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        } else {
            axios.post('/search', {})
                .then(res => {
                    //this.setState(res.data);

                })
                .catch(err => {
                    console.log('error occured!');
                });
            //console.log(this.props.auth.user.id);

            axios.post('/search/order', { id: this.props.auth.user.id })
                .then(res => {
                    this.setState({ data: res.data });
                    //console.log(res.data);
                })
                .catch(err => {
                    console.log('error occured!');
                });



        }

    }

    orderRender() {

        if (this.state.data != null) {
            let temp = [];
            //console.log(this.state.length);
            const len = Object.keys(this.state.data).length;
            for (let i = 0; i < len; i++) {
                temp.push(<div key={i}>{this.myFunction(i)}</div>);
            }
            //console.log(temp);
            return (temp);

        } else {
            return (<div>state null</div>);

        }


    }

    deleteOrder(id, i) {
        console.log('id', id);
        this.state.data.splice(i, 1);
        this.setState({

            data: this.state.data

        });



        axios.post('/search/order/remove', { id: this.props.auth.user.id, _id: id })
            .then(res => {
                console.log("order deleted");
            })
            .catch(err => {
                console.log('error occured!');
            });



    }

    myFunction(i = 0) {
        if (this.state.data != null) {
            const productNames = [];

            if (this.state.data[i].products != null) {

                let ordersLength = this.state.data[i].products.length;
                const products = this.state.data[i].products;

                for (let i = 0; i < ordersLength; i++) {
                    productNames.push(<div key={i}> <li>{products[i].name}</li></div>);
                }


            }


            //console.log(this.state.data);
            return (


                <div className="card col-sm" style={{ backgroundColor: '#045245b9', height: '450px', width: '350px', marginLeft: '10px', marginTop: '40px' }}>
                    <img src={this.state.data[i].image} className="card-img-top" alt="myimg" style={{ height: '200px', width: '280px', marginLeft: '20px', marginTop: '20px' }} />
                    <div className="card-body" style={{ backgroundColor: '#e2dedecc', height: '100px', width: '320px', marginLeft: '0px', marginBottom: '10px' }}>
                        <h5 className="card-title"><b>{this.state.data[i].name}</b></h5>
                        <h6 className="card-text"><b>Order Id:</b>{this.state.data[i]._id}</h6>
                        {/* <div className="card-text"><h6><b>Items: </b><ol>{productNames}</ol></h6> 
                </div> */}
                        <p className="card-text"><b>Order Total: $ {(this.state.data[i].total * 1.1).toFixed(2)}</b></p>
                        {/* {this.state[i].id} */}
                        {/* <a href="/orderdetails/?" className="btn btn-primary" >Order Details</a> */}
                        <div className='row btn-toolbar'>
                            <div className="col-6 text-right">
                                <Link className="btn btn-primary " to={`/orderdetails/${this.state.data[i]._id}`}>Order Details</Link>
                            </div>
                            {/* <br/>
                    <br/> */}
                            <div className="col-3 text-right">
                                <button className="btn btn-primary " style={{ backgroundColor: '#d31111b9' }} onClick={() => this.deleteOrder(this.state.data[i]._id, i)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>);

        } else {
            return (<div>No Open Orders.</div>);
        }



    }

    createOrder() {
        axios.post('/search/order/add', { id: this.props.auth.user.id })
            .then(res => {
                //this.props.history.push(`/orderdetails/${res.data._id}`);
            })
            .catch(err => {
                console.log('error occured!');
            });
        //this.componentWillMount();
        //this.props.history.push(`/orderdetails/${res.data._id}`);

        axios.post('/search/neworder', { id: this.props.auth.user.id })
            .then(res => {
                this.props.history.push(`/orderdetails/${res.data._id}`);
                //console.log('fffffffffffffffffffffffffff',res.data);
            })
            .catch(err => {
                console.log('error occured!');
            });





    }


    render() {
        document.body.style.backgroundImage ="url('https://citrusbits.com/wp-content/uploads/2017/10/development-company-websites.jpg?id=17132')";
        document.body.style.opacity=1;
        //document.body.style = { mainBg };
        const orders = this.orderRender();
        //const orders1 = this.myFunction(0);
        console.log('inside render');
        //console.log(this.props.auth.user.id);
        //let imgUrl = 'https://pngimage.net/wp-content/uploads/2018/05/e-commerce-background-png-3.png';
        // let img = <div><img src='https://pngimage.net/wp-content/uploads/2018/05/e-commerce-background-png-3.png' alt='my image' /></div>

        //console.log(this.state);
        //const data =[{"name":"test1"},{"name":"test2"}];
        //const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);
        return (

            <div className='container' id='home'>
                <div>


                </div>



                <div className='container' style={{ marginTop: '10px' }}>


                </div>

                <div className="card" style={{ backgroundColor: '#292a2c85', width: '1050px', height: '70px', marginLeft: '0px', marginTop: '30px', opacity: 0.9 }}>
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-3 text-right">
                                <h3 ><b style={{ color: "white" }}>Open Orders.</b></h3>
                            </div>
                            <div className="col-8 text-right">
                                <button className="btn btn-primary " style={{ backgroundColor: '#a969ddd0' }} onClick={() => this.createOrder()}>Create a New Order</button>
                            </div>
                        </div>



                    </div>
                </div>
                <br />

                <div className='row'>{orders}</div>




            </div>





        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Home));