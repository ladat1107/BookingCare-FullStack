import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ForYou.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
//import images from '../../../assets/headerHomePage/ForYou';

import CircleText from "../../../components/HomePage/CircleText";

class ForYou extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //slideImages = images.keys().map(images);

    componentDidMount() {
    }


    render() {
        return (
            <div className="for-you-container" >
                <div className='for-you-content'>
                    <div className='up'>
                        <span><FormattedMessage id="homepage-header.forYou" /></span>
                    </div>
                    <div className="down">
                        <CircleText image={"../../assets/headerHomePage/csyt.png"}
                            text={<FormattedMessage id="homepage-header.medical_facility" />} />
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'><FormattedMessage id="homepage-header.medical_facility" /></div>
                        </div>
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'><FormattedMessage id="homepage-header.doctor" /></div>
                        </div>
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'><FormattedMessage id="homepage-header.specialty" /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForYou);
