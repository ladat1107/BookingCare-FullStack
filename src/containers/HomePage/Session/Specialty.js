import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Specialty.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from '../../../assets/headerHomePage/thankinh.png';

import ItemSlider from "../../../components/HomePage/ItemSlider";

const properties = {
    prevArrow: <button className='custom'><i className="fa-solid fa-chevron-left icon"></i></button>,
    nextArrow: <button className='custom'><i className="fa-solid fa-chevron-right icon"></i></button>
}

class Specialty extends Component {

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
            <div className="specialty-container" >
                <div className='specialty-content'>
                    <div className='up'>
                        <div className='text'> <FormattedMessage id={"homepage-header.specialty"} defaultMessage="Medical Specialties" /></div>
                        <div className='button'><FormattedMessage id="homepage-header.view_more" /></div>
                    </div>
                    <div className="down">
                        <Slide
                            slidesToScroll={2}
                            slidesToShow={3}
                            indicators={true}
                            {...properties}
                        >
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
                            <ItemSlider
                                image={images}
                                text={"Thần kinh"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
