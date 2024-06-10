import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Media.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from "../../../assets/headerHomePage/media";

import CircleText from "../../../components/HomePage/CircleText";

class Media extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //slideImages = images.keys().map(images);

    componentDidMount() {
    }


    render() {
        console.log("image:  ", images);
        return (
            <div className="media-container" >
                <div className="media-content">
                    <div className='up'>
                        <span>Truyền thông nói về BookingCare</span>
                    </div>
                    <div className="down">
                        <div className='down-left'>
                            <iframe className='video'
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>

                            </iframe>
                        </div>
                        <div className='down-right'>
                            <div className='down-line'>
                                <div className='item'>
                                    <a href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm' target='_blank'>
                                        <img src={images[0]} />
                                    </a>
                                </div>
                                <div className='item'>
                                    <a href='https://vietnamnet.vn/thong-tin-truyen-thong' target='_blank'>
                                        <img src={images[1]} />
                                    </a>
                                </div>
                            </div>
                            <div className='down-line'>
                                <div className='item'>
                                    <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html' target='_blank'>
                                        <img src={images[2]} />
                                    </a>
                                </div>
                                <div className='item'>
                                    <a href='https://vtcnews.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html' target='_blank'>
                                        <img src={images[3]} />
                                    </a>
                                </div>
                            </div>
                            <div className='down-line'>
                                <div className='item'>
                                    <a href='https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html' target='_blank'>
                                        <img src={images[4]} />
                                    </a>
                                </div>
                                <div className='item'>
                                    <a href='https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html' target='_blank'>
                                        <img src={images[5]} />
                                    </a>
                                </div>
                            </div>
                            <div className='down-line'>
                                <div className='item'>
                                    <a href='https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html' target='_blank'>
                                        <img src={images[6]} />
                                    </a>
                                </div>
                                <div className='item'>
                                    <a href='' target='_blank'>
                                        <img src={images[7]} />
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
