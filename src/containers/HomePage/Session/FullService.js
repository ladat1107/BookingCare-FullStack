import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./FullService.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
//import images from '../../../assets/headerHomePage/FullService';

class FullService extends Component {

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
            <div className="service-container" >
                <div className='service-content'>
                    <div className='service-header'>
                        <span>Dịch vụ toàn diện</span>
                    </div>
                    <div className="service-body">
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'><i className="fa-regular fa-hospital fa-2xl"></i></div>
                                <div className='text'>Khám chuyên khoa</div>
                            </div>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-phone fa-2xl"></i></div>
                                <div className='text'>Khám từ xa</div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Khám tổng quát</div>
                            </div>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Xét nghiệm y học</div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Khám nha khoa</div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Gói phẫu thuật</div>
                            </div>
                            <div className='item'>
                                <div className='icon'></div>
                                <div className='text'>Sống khỏe tiểu đường</div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullService);
