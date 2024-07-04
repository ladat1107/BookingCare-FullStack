import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./HomePageFooter.scss";
import { changeLanguageApp } from '../../store/actions';
class HomePageFooter extends Component {

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
            <div className="home-footer-container" >
                <div className='home-footer-content'>
                    <div className='footer-left'>
                        2024 BookingCare.
                    </div>
                    <div className='footer-right'>
                        <div className='item'>
                            <i className="fa-brands fa-tiktok fa-shake"></i>
                        </div>
                        <div className='item'>
                            <i className="fa-brands fa-facebook fa-shake"></i>
                        </div>
                        <div className='item'>
                            <i className="fa-brands fa-youtube fa-shake"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageFooter);
