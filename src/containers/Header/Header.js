import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGE } from '../../utils';
import { changeLanguageApp } from "../../store/actions";

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout } = this.props;
        let language = this.props.language;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='right'>
                    <div className='language'>
                        <div className='item'>
                            <i className="fa-solid fa-globe icon"></i>
                            <div className='text'>
                                <span className={language === "vi" ? "choose" : ""} onClick={() => this.changeLanguage(LANGUAGE.VI)}>VI</span>

                                <span className={language === "en" ? "choose" : ""} onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
