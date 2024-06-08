import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Specialty.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
//import images from '../../../assets/headerHomePage/Specialty';

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
                        <span>Chuyên khoa</span>
                    </div>
                    <div className="down">
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'>Cơ sỡ y tế</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
