import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./HomePageHeader.scss";
import { LANGUAGE } from "../../utils";
import { changeLanguageApp } from '../../store/actions';
class HomePageHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }


    render() {
        let language = this.props.language;
        return (
            <div className="home-header-container" >
                <div className='home-header-content'>
                    <div className='header-left'>
                        <i className="fa-solid fa-bars menu"></i>
                        <div className='logo'>

                        </div>
                    </div>
                    <div className='header-center'>
                        <div className='option'>
                            <div className='option-all choose' >
                                <FormattedMessage id={"homepage-header.all"} />
                            </div>
                            <div className='option-house'>
                                <FormattedMessage id={"homepage-header.house"} />
                            </div>
                            <div className='option-hospital'>
                                <FormattedMessage id={"homepage-header.hospital"} />
                            </div>
                            <div className='option-healthy'>
                                <FormattedMessage id={"homepage-header.healthy"} />
                            </div>
                        </div>
                        <div className='search-container'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <div className='input-search'>
                                {<FormattedMessage id={"homepage-header.search"} />}
                            </div>
                        </div>
                    </div>
                    <div className='header-right'>
                        <div className='item'>
                            <i className="fa-solid fa-clock-rotate-left icon"></i>
                            <div className='text'><FormattedMessage id={"homepage-header.schedule"} /></div>
                        </div>
                        <div className='item'>
                            <i className="fa-solid fa-headset icon"></i>
                            <div className='text'><FormattedMessage id={"homepage-header.support"} /></div>
                        </div>

                    </div>
                    <div className='language'>
                        <div className='item'>
                            <i className="fa-solid fa-globe icon"></i>
                            <div className='text'>
                                <span className={language === "vi" ? "choose" : ""} onClick={() => this.changeLanguage(LANGUAGE.VI)}>VI</span>

                                <span className={language === "en" ? "choose" : ""} onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
