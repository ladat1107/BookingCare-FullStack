import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import "./DoctorInfo.scss";
import { parse, format, addDays } from 'date-fns';
import { LANGUAGE } from '../../utils';
import * as userService from "../../services/userService";
import _ from 'lodash';
const weekMap = [
    { en: 'Monday', vi: 'Thứ Hai' },
    { en: 'Tuesday', vi: 'Thứ Ba' },
    { en: 'Wednesday', vi: 'Thứ Tư' },
    { en: 'Thursday', vi: 'Thứ Năm' },
    { en: 'Friday', vi: 'Thứ Sáu' },
    { en: 'Saturday', vi: 'Thứ Bảy' },
    { en: 'Sunday', vi: 'Chủ Nhật' }
];

class DoctorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailPrice: false,
            doctorInfor: this.props.doctorInfor,
        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, nextProps) {
        if (this.props.doctorInfor != null && this.props.doctorInfor !== prevProps.doctorInfor) {
            this.setState({
                doctorInfor: this.props.doctorInfor,
            })
        }
    }
    handleClickDetailPrice = () => {
        this.setState({
            isShowDetailPrice: !this.state.isShowDetailPrice,
        })
    }




    render() {
        let language = this.props.language;
        let { isShowDetailPrice, doctorInfor } = this.state;
        let price = doctorInfor && doctorInfor.priceData ? doctorInfor.priceData : "";
        let payment = doctorInfor && doctorInfor.paymentData ? doctorInfor.paymenteData : "";
        console.log("Check infor :", this.props.doctorInfor);
        return (
            <Fragment>
                {doctorInfor && doctorInfor.nameClinic && doctorInfor.addressClinic ?
                    <div className="componment-infor-doctor">
                        <Row className="address-doctor1">
                            địa chỉ khám
                        </Row>
                        <Row className="hospital-name-doctor">
                            {doctorInfor.nameClinic ? doctorInfor.nameClinic : ""}
                        </Row >
                        <Row className="hospital-address-doctor">
                            {doctorInfor.addressClinic ? doctorInfor.addressClinic : ""}
                        </Row >
                        {isShowDetailPrice === true ? <Row className="price-examination-doctor-show">
                            <div className='text-price-doctor'>Giá khám:</div>
                            <div className='table-number-price-doctor'>
                                <div className='up'>
                                    <div className='left'>
                                        <div className='left-up'>Giá khám</div>
                                        <div className='left-down'>Giá khám chưa bao gồm chi phí chụp chiếu xét nghiệm</div>
                                    </div>
                                    <div className='right'>
                                        {price && (language === LANGUAGE.VI ? price.valueVi + " đ" : price.valueEn + " $")}
                                    </div>
                                </div>
                                <div className='down'>Bệnh viện có hình thức thanh toán chi phí bằng  {payment && (language === LANGUAGE.VI ? payment.valueVi : payment.valueEn)}</div>
                            </div>
                            <div className='text-price-detail'><span onClick={() => { this.handleClickDetailPrice() }}><b>Ẩn bảng giá</b></span> </div>
                        </Row> : <Row className="price-examination-doctor-hide">
                            <span className='text-price-doctor'>Giá khám:</span>
                            <span className='number-price-doctor'>{price && (language === LANGUAGE.VI ? price.valueVi + " đ" : price.valueEn + " $")}</span>
                            <span className='text-price-detail' onClick={() => { this.handleClickDetailPrice() }}><b>Xem chi tiết</b></span>
                        </Row>}
                    </div >
                    :
                    <div></div>
                } </Fragment>)
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
