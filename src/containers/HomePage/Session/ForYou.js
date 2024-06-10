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
                        <span>Dành cho bạn</span>
                    </div>
                    <div className="down">
                        <CircleText image={"../../assets/headerHomePage/csyt.png"}
                            text={"Cơ sỡ y tế 0"} />
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'>Cơ sỡ y tế</div>
                        </div>
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'>Bác sĩ</div>
                        </div>
                        <div className='item'>
                            <div className='image'></div>
                            <div className='text'>Chuyên khoa</div>
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
