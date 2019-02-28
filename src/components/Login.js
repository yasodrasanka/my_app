// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';
import './Login.css';
import back from '../images/background.png';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        document.body.style.backgroundImage = `url(${back})`;
        const { errors } = this.state;
        return (
            <div className="card col-sm" style={{ opacity: 0.9, backgroundColor: '#58595a86', height: '320px', width: '650px', marginLeft: '200px', marginTop: '200px' }}>
                <div className="container" style={{ marginTop: '20px', width: '600px' }}>
                    <h2 style={{ opacity: 1, marginBottom: '40px', color: 'white' }}>Login</h2>
                    <img src='https://png.pngtree.com/svg/20161229/e7a5cf5c9e.svg' alt='loginim' style={{ height: '60px', width: '60px', marginLeft: '100px', marginTop: '-140px' }} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '', marginTop: '10px' }}>
                                Login User
                    </button>
                        </div>
                    </form>

                </div>

            </div>
        )
    }
}

//export default Login;

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)