import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Facility.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from '../../../assets/headerHomePage/viet-duc.jpg';

import ItemSlider from "../../../components/HomePage/ItemSlider";

const properties = {
    prevArrow: <button className='custom'><i className="fa-solid fa-chevron-left icon"></i></button>,
    nextArrow: <button className='custom'><i className="fa-solid fa-chevron-right icon"></i></button>
}

class Facility extends Component {

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
            <div className="facility-container" >
                <div className='facility-content'>
                    <div className='up'>
                        <div className='text'><FormattedMessage id="homepage-header.medical_facility" /></div>
                        <div className='button'><FormattedMessage id="homepage-header.view_more" /></div>
                    </div>
                    <div className="down">
                        <Slide
                            slidesToScroll={2}
                            slidesToShow={3}
                            indicators={true}
                            canSwipe={true}
                            {...properties}
                        >
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />
                            <ItemSlider
                                image={images}
                                text={"Bệnh viện Việt Đức"} />


                        </Slide>


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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
