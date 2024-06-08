import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import icoFace from "../../assets/images/Facebook_Logo.png";
import icoGoogle from "../../assets/images/google.png";

import { handleLogin } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPass: false,
            errMessage: "",
        }
    }
    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    hanldeOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnClickLogin = async () => {
        this.setState({
            errMessage: "",
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            } else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data)
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                console.log(e);
            }
        }
    }
    handleOnClickEye = () => {
        this.setState({
            isShowPass: !this.state.isShowPass,
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='row'>
                            <div className='col-12 text-login'>LOGIN</div>
                            <div className='col-12 form-group form-ma'>
                                <label>User Name</label>
                                <input type='text'
                                    className='form-control'
                                    placeholder='User name'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUserName(event)} />
                            </div>

                            <div className='col-12 form-group form-ma'>
                                <label>Password</label>
                                <div className='custom-password'>
                                    <input type={this.state.isShowPass ? "text" : 'password'}
                                        className='form-control'
                                        placeholder='Password'
                                        value={this.state.password}
                                        onChange={(event) => this.hanldeOnChangePassword(event)} />
                                    <i className={this.state.isShowPass ? "fa-solid fa-eye icon" : "fa-solid fa-eye-slash icon"}
                                        onClick={() => { this.handleOnClickEye() }}></i>
                                </div>
                            </div>
                            <div className='col-12 text-err'>{this.state.errMessage}</div>
                            <div className='col-12'>
                                <button className='btn-login'
                                    onClick={() => { this.handleOnClickLogin() }}>Login</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-pass'>Forgot your password?</span>
                            </div>
                            <div className='col-12 orlogin'>
                                <div className='text-orlogin'>Or Login with: </div>
                            </div>
                            <div className='col-12 image-login'>
                                <div className='col-6 image-logo'>
                                    <img className='logo' src={icoFace} />
                                </div>
                                <div className='col-6 image-logo'>
                                    <img className='logo' src={icoGoogle} /> </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
