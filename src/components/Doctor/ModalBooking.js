import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ModalBooking.scss";
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button, Row, Col, Label, Input } from 'reactstrap';
import DescriptionDoctor from "../../containers/Patient/Doctor/Session/DescriptionDoctor";
import { createAppointmentDoctor } from "../../services/userService";
import { LANGUAGE } from '../../utils';
import { lang } from 'moment/moment';
const weekMap = [
    { en: 'Monday', vi: 'Thứ Hai' },
    { en: 'Tuesday', vi: 'Thứ Ba' },
    { en: 'Wednesday', vi: 'Thứ Tư' },
    { en: 'Thursday', vi: 'Thứ Năm' },
    { en: 'Friday', vi: 'Thứ Sáu' },
    { en: 'Saturday', vi: 'Thứ Bảy' },
    { en: 'Sunday', vi: 'Chủ Nhật' }
];

class ModalBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBooking: {},
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            labelTime: "",
        }

    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, nextProps) {
        if (this.props.dataBooking !== prevProps.dataBooking && this.props.dataBooking) {
            this.setState({
                dataBooking: this.props.dataBooking
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState(copyState);
    }
    checkEmptyInput = () => {
        let arr = ["firstName", "lastName", "email", "address", "phoneNumber", "reason"]
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                toast.warn(<FormattedMessage id="system.admin.schedule-doctor.warningMessage" />);
                return false;
            }
        }
        return true;
    }
    handleButtonCreate = async () => {
        let isEmpty = this.checkEmptyInput();
        if (isEmpty === true) {
            let { dataBooking, firstName, phoneNumber, email, address, reason, lastName, labelTime } = this.state;
            let dataInput = ({
                doctorId: dataBooking.timeData.doctorId,
                timeType: dataBooking.timeData.timeType,
                date: dataBooking.timeData.date,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
                reason: reason,
                time: this.formatDate(dataBooking.timeData, this.props.language),
                addressClinic: dataBooking.doctorData.Doctor_info.addressClinic,
                nameClinic: dataBooking.doctorData.Doctor_infonameClinic,
                doctorName: dataBooking.doctorData.firstName,
            });
            console.log("check dataInput", dataInput)
            let respone = await createAppointmentDoctor(dataInput)
            if (respone && respone.errCode === 200) {
                this.setState({
                    dataBooking: {},
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    reason: "",
                    labelTime: "",
                })
                toast.success("Đặt lịch hẹn thành công\nVui lòng kiểm tra email của bạn!");
                this.props.toggleFromParent();
            } else {
                toast.error(respone.message)
            }
        }
    }
    formatDate = (timeDate, language) => {
        let dateString = new Date(timeDate.date);
        if (language === LANGUAGE.EN) {
            return `${timeDate.timeData.valueEn} - ${weekMap[dateString.getDay()].en} - ${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`;
        } else {
            return `${timeDate.timeData.valueVi} - ${weekMap[dateString.getDay()].vi} - ${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getUTCFullYear()}`;
        }
    }
    render() {
        let language = this.props.language;
        let { dataBooking, firstName, phoneNumber, email, address, reason, lastName, labelTime } = this.state
        let doctor = dataBooking ? dataBooking.doctorData : {};
        let price = 0;
        if (doctor && doctor.Doctor_info && doctor.Doctor_info.priceData) {
            price = language === LANGUAGE.VI ? doctor.Doctor_info.priceData.valueVi + " VNĐ" : doctor.Doctor_info.priceData.valueEn + " $";
        }
        let timeData = dataBooking ? dataBooking.timeData : {};
        if (timeData && timeData.date && timeData.timeData) {
            labelTime = this.formatDate(timeData, language);
        }
        console.log("check dataBooking", dataBooking)
        console.log("check labelTime", labelTime)
        return (
            <Modal

                className='modal-booking-item'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                centered
                size='lg'
                backdrop="static"
                keyboard={false}
            >
                <div className='header-booking'>
                    <DescriptionDoctor doctorParent={doctor ? doctor : {}} />
                </div>
                <div className='body-booking'>
                    <Row className='row-first'>
                        <div className='price-booking-of-doctor'>Giá khám: <span>{price}</span></div>
                        <div className='time-booking-of-doctor'>Thời gian: {labelTime}</div>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label for="firstName">
                                <FormattedMessage id="home.doctor.firstName" />
                            </Label>
                            <Input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(event) => { this.handleChangeInput(event, "firstName") }}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="lastName">
                                <FormattedMessage id="home.doctor.lastName" />
                            </Label>
                            <Input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(event) => { this.handleChangeInput(event, "lastName") }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label for="exampleEmail">
                                <FormattedMessage id="home.doctor.email" />
                            </Label>
                            <Input
                                id="exampleEmail"
                                type="email"
                                value={email}
                                onChange={(event) => { this.handleChangeInput(event, "email") }}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="phoneNumber">
                                <FormattedMessage id="home.doctor.phoneNumber" />
                            </Label>
                            <Input
                                id="phoneNumber"
                                type="number"
                                value={phoneNumber}
                                onChange={(event) => { this.handleChangeInput(event, "phoneNumber") }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Label for="address">
                                <FormattedMessage id="home.doctor.address" />
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(event) => { this.handleChangeInput(event, "address") }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Label for="reason">
                                <FormattedMessage id="home.doctor.reason" />
                            </Label>
                            <Input
                                id="reason"
                                type="text"
                                value={reason}
                                onChange={(event) => { this.handleChangeInput(event, "reason") }}
                            />
                        </Col>
                    </Row>

                </div>
                <div className='footer-booking'>
                    <div className="btn-footer-book mx-3" onClick={() => { this.handleButtonCreate() }}>
                        <FormattedMessage id="home.doctor.booking" />
                    </div>
                    <div className="btn-footer-close mx-3" onClick={() => { this.toggle() }}>
                        <FormattedMessage id="home.doctor.close" />
                    </div>
                </div>
            </Modal>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
