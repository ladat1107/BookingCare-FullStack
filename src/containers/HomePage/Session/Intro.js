import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Intro.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from '../../../assets/headerHomePage/Intro';
//const images = require.context('../../../assets/headerHomePage/Intro', false, /\.(png|jpe?g|svg)$/);



class Intro extends Component {

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
            <div className="intro-container" >
                <div className='back-ground-behind'></div>
                <div className="slide-container">
                    <Slide
                        duration={1000} // Thời gian mỗi slide hiện (milliseconds)
                        transitionDuration={200} // Thời gian chuyển giữa các slide (milliseconds)
                        arrows={false} // Hiển thị nút mũi tên
                        infinite={true} // Lặp lại vô hạn
                        canSwipe={true} // Cho phép kéo (swipe)
                        indicators={true} // Hiển thị các chỉ số (dots)
                        autoplay={true} // Tự động chuyển slide// Xử lý khi slide thay đổi
                        pauseOnHover={true} // Tạm dừng khi rê chuột vào
                    >
                        {images.map((each, index) => (
                            <div key={index} className="each-slide">
                                <div style={{ 'backgroundImage': `url(${each})` }}>
                                </div>
                            </div>
                        ))}
                    </Slide>
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

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
