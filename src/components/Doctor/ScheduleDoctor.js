import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Modal } from 'reactstrap';
import { connect } from 'react-redux';
import "./ScheduleDoctor.scss";
import { parse, format, addDays } from 'date-fns';
import { LANGUAGE } from '../../utils';
import * as userService from "../../services/userService";
import _ from 'lodash';
import ModalBooking from "./ModalBooking"
import { da, it } from 'date-fns/locale';
const weekMap = [
    { en: 'Monday', vi: 'Thứ Hai' },
    { en: 'Tuesday', vi: 'Thứ Ba' },
    { en: 'Wednesday', vi: 'Thứ Tư' },
    { en: 'Thursday', vi: 'Thứ Năm' },
    { en: 'Friday', vi: 'Thứ Sáu' },
    { en: 'Saturday', vi: 'Thứ Bảy' },
    { en: 'Sunday', vi: 'Chủ Nhật' }
];

class ScheduleDoctor extends Component {

    constructor(props) {
        super(props);
        let day = new Date();
        this.state = {
            dataBooking: {},
            doctor: [],
            isOpenModalBooking: false,
            today: day.getTime(day.setHours(0, 0, 0, 0)),
            arrDay: [],
            arrTime: [],
        }
    }
    formatDate = (dateString, language) => {
        if (language === LANGUAGE.EN) {
            return `${weekMap[dateString.getDay()].en} - ${dateString.getDate()} / ${dateString.getMonth() + 1}`;
        } else {
            return `${weekMap[dateString.getDay()].vi} - ${dateString.getDate()} / ${dateString.getMonth() + 1}`;
        }
    }
    componentDidMount() {
        this.setArrDay();
        this.setArrTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDay();
        }
        if (this.props.doctorParent !== prevProps.doctorParent) {
            this.setState({
                doctor: this.props.doctorParent,
            })
            this.setArrTime();
        }
    }
    setArrDay = () => {
        let language = this.props.language
        if (!language) return;
        let arrDay = [];
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let nextDay = addDays(today, i);
            arrDay.push({
                "label": this.formatDate(nextDay, language),
                "value": nextDay.getTime(nextDay.setHours(0, 0, 0, 0)),
            });
        }
        this.setState({
            arrDay: arrDay
        })
    }
    handleOnSelected = async (event) => {
        this.setState({
            today: event.target.value,
        }, () => { this.setArrTime() })

    }
    setArrTime = async () => {
        let doctorId = this.props.doctorParent.id;
        if (doctorId) {
            let respone = await userService.getScheduleDoctorByDate(doctorId, this.state.today)
            if (respone && respone.errCode === 201 && respone.data) {
                let allTime = respone.data;
                if (allTime.length > 0) {
                    allTime = allTime.map(item => ({ ...item, selected: false }))
                }
                this.setState({
                    arrTime: allTime,
                })
            }
        }
    }
    handleClickChoose = (item) => {
        let data = {};
        data = ({ timeData: item, doctorData: this.state.doctor });
        this.setState({
            isOpenModalBooking: true,
            dataBooking: data,
        })
    }
    toggle = () => {
        this.setState({ isOpenModalBooking: false })
    }
    render() {
        let language = this.props.language;
        let { arrDay, arrTime, dataBooking, doctor } = this.state;
        
        return (
            <Fragment>
                {doctor && _.isEmpty(doctor) ?
                    <div className="componment-schedule-doctor">
                        <Row className="selecte-time-doctor">
                            <select class="form-select1"
                                aria-label="Default select example"
                                onChange={(event) => { this.handleOnSelected(event) }}>
                                {arrDay && arrDay.length > 0 && arrDay.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.value}>{item.label}
                                        </option>
                                    )
                                })}
                            </select>

                        </Row>
                        <Row >
                            <div className="medical-schedule-text"><i className="fa-solid fa-calendar-days"></i>LỊCH KHÁM</div>
                        </Row >
                        <Row className="medical-examination-schedule">

                            {arrTime && !_.isEmpty(arrTime) ?
                                <>
                                    {arrTime.map((item, index) => {
                                        return (
                                            <div className={item.selected === true ? 'btn-schedule active' : 'btn-schedule'} key={item.id}
                                                onClick={() => { this.handleClickChoose(item) }}
                                            >
                                                {language === LANGUAGE.VI ? item.timeData.valueVi : item.timeData.valueEn}
                                            </div>
                                        )
                                    })
                                    } <div className='medical-schedule-book'> <span>Chọn <i className="fa-solid fa-hand-point-up"></i> và đặt (Phí đặt lịch 0đ)</span></div>
                                </> : <div>Không có lịch làm việc của y bác sĩ!</div>}
                        </Row>
                        <ModalBooking
                            isOpen={this.state.isOpenModalBooking}
                            toggleFromParent={this.toggle}
                            dataBooking={dataBooking ? dataBooking : {}}
                        />
                    </div > : <Fragment></Fragment>}
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
