// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import logo from '../images/my.jpg';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <img src={logo} alt={user.name} title={user.name}
                    className="rounded-circle"
                    style={{ height: '30px', width: '30px', marginRight: '5px', marginTop: '5px' }} />
                <a href="/" className="nav-link" style={{ color: 'white' }} onClick={this.onLogout.bind(this)}>
                    Logout


                </a>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item col-1-right row" >
                    <img src='https://www.hapihhost.in/wp-content/uploads/2018/08/signupicon.png?x56760' alt='signup' title='sign up'
                        style={{ height: '30px', width: '30px', marginRight: '0px', marginTop: '5px' }} />
                    <Link className="nav-link" style={{ color: 'white', marginRight: '55px' }} to="/register"><b>Sign Up</b></Link>
                </li>
                <li className="nav-item col-10-right row">
                    <img src='https://png.pngtree.com/svg/20161229/e7a5cf5c9e.png' alt='signIn' title='sign in'
                        style={{ height: '30px', width: '30px', marginRight: '0px', marginTop: '5px' ,opacity:0.9}} />
                    <Link className="nav-link" style={{ color: 'white', marginRight: '50px' }} to="/login"><b>Sign In</b></Link>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3a3b3de5', opacity: 1 }}>
                <img src='https://www.clearon.se/globalassets/vara-tjanster/kassasystem/kassasystem_icon.png' alt='navlogo' style={{ height: '40px', width: '40px', marginLeft: '0px', marginTop: '0px' }} />
                <Link className="navbar-brand" style={{ marginLeft: '10px', marginTop: '0px', color: 'white' }} to='/'>POS Application</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
//export default Navbar;

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));