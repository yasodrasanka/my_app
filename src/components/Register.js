// Register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import './Register.css';
import back from '../images/background.png';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log('reg constructor');
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
        //
    }


    componentWillReceiveProps(nextProps) {
        console.log('inside reg will recieve');
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
        console.log('inside reg did mount');
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        document.body.style.backgroundImage = `url(${back})`;
        console.log('inside register render st');
        //console.log(user);
        const { errors } = this.state;
        return (
            <div className="card col-sm" style={{ opacity: 1, backgroundColor: '#58595a86', height: '480px', width: '800px', marginLeft: '200px', marginTop: '200px' }}>
                <div className="container" style={{ width: '700px', marginTop: '40px' }}>
                    <h2 style={{ marginBottom: '40px', color: 'white' }}>Registration</h2>
                    <img src='https://spirit.church/images/user_images/connect/signup-icon.png' alt='loginim' style={{ height: '60px', width: '60px', marginLeft: '200px', marginTop: '-140px' }} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name
                                })}
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                            />
                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                        </div>
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
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password_confirm
                                })}
                                name="password_confirm"
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}
                            />
                            {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                        </div>
                        <div className="form-group">
                            <button type="submit" style={{ marginTop: '10px' }} className="btn btn-primary">
                                Register User
                    </button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))