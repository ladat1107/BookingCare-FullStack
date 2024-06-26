// import React, { Component, useState } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { Form, Row, Col, Button } from "reactstrap";
// import "./SchedulePage.scss";
// import { ToastContainer, toast } from 'react-toastify';
// import * as adminService from "../../../services/adminService";
// import * as action from "../../../store/actions/adminActions"
// import Select from 'react-select';
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
// import _ from 'lodash';
// import { it } from 'date-fns/locale';
// import { LANGUAGE } from '../../../utils';
// //const [startDate, setStartDate] = useState(new Date());
// class SchedulePage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             allTime: [],
//             allDoctor: [],
//             selectedOption: null,
//             today: new Date(),
//         }
//     }

//     async componentDidMount() {
//         await this.getDoctorSelect();
//         await this.props.getGender();
//     }
//     async getDoctorSelect() {
//         let respone = await adminService.getTopDoctor();
//         if (respone && respone.errCode === 0) {
//             let arrDoctor = respone.data;
//             if (arrDoctor && arrDoctor.length > 0) {
//                 let options = [];
//                 arrDoctor.map((item, index) => {
//                     let ob = { value: item.id, label: item.lastName + " " + item.firstName }
//                     options.push(ob)
//                 })
//                 this.setState({
//                     allDoctor: options,
//                 })
//             }
//         }
//     }
//     handleChange = async (selectedOption) => {
//         this.setState({
//             selectedOption: selectedOption,
//         })
//     };

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.arrTime !== prevProps.arrTime) {
//             let arr = this.props.arrTime;
//             if (arr && !_.isEmpty(arr)) {
//                 arr = arr.map(item => ({ ...item, selected: false }))
//             }
//             this.setState({
//                 allTime: arr,
//             })
//         }
//     }
//     setStartDate = (choosedate) => {
//         this.setState({
//             today: choosedate,
//         })
//     }
//     handleClickChoose = (timeChoose) => {
//         let { allTime } = this.state;
//         if (allTime && !_.isEmpty(allTime)) {
//             for (let object of allTime) {
//                 if (object.id === timeChoose.id) {
//                     object.selected = !object.selected;
//                     break;
//                 }
//             }
//         }
//         this.setState({
//             allTime: allTime,
//         })
//     }
//     hanldeClickSaveSchedule = async () => {
//         let data = [];
//         let { allTime, selectedOption, today } = this.state;
//         if (!selectedOption || !today) {
//             toast.warn("Vui lòng chọn ngày và bác sĩ");
//             return;
//         }
//         for (let item of allTime) {
//             if (item.selected === true) {
//                 data.push({
//                     doctorId: selectedOption.value,
//                     date: today.getTime(today.setHours(0, 0, 0, 0)),
//                     timeType: item.keyMap,
//                 })
//             }
//         }
//         if (!data || _.isEmpty(data)) {
//             toast.warn("Vui lòng chọn lịch khám");
//             return;
//         } else {
//             let res = await adminService.createScheduleDoctor(data);
//             if (res && res.errCode === 201) {
//                 let arr = this.state.allTime;
//                 if (arr && !_.isEmpty(arr)) {
//                     arr = arr.map(item => ({ ...item, selected: false }))
//                 }
//                 this.setState({
//                     allTime: arr,
//                     selectedOption: null,
//                     today: new Date(),
//                 })
//                 toast.success("Thêm lịch thành công");
//             }
//             else if (res && res.errCode !== 201) {
//                 toast.error(res.message)
//             }
//         }

//     }

//     render() {
//         let language = this.props.language;
//         let { selectedOption, allDoctor, allTime } = this.state;
//         return (
//             <div className="container" >
//                 <div className='schedulePage-doctor-content'>
//                     <div className="text-center title"><FormattedMessage id={"system.admin.schedule-doctor.title"}/></div>
//                     <Row className='select-datetime mt-3'>
//                         <Col className='select-doctor' md={4}>
//                             <label className='text'> Select doctor: </label>
//                             <Select
//                                 value={selectedOption}
//                                 onChange={this.handleChange}
//                                 options={allDoctor.length > 0 ? allDoctor : []}
//                             />
//                         </Col>
//                         <Col md={1}></Col>
//                         <Col className='datetime-doctor' md={4}>
//                             <label className='text'> Select date: </label>
//                             <div className='date-picker'><DatePicker
//                                 className='form-control '
//                                 showIcon
//                                 selected={this.state.today}
//                                 minDate={new Date()}
//                                 onChange={(date) => this.setStartDate(date)}
//                             /></div>
//                         </Col>
//                     </Row>
//                     <Row className='schedule-doctor-choose'>
//                         {allTime && !_.isEmpty(allTime) && allTime.map((item, index) => {
//                             return (
//                                 <div className={item.selected === true ? 'btn-schedule active' : 'btn-schedule'} key={item.id}
//                                     onClick={() => { this.handleClickChoose(item) }}
//                                 >
//                                     {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
//                                 </div>
//                             )
//                         })}
//                     </Row>
//                     <Row className='schedule-doctor-choose'>
//                         <Button className='btn-schedule-save'
//                             onClick={() => { this.hanldeClickSaveSchedule() }}>Save</Button>
//                     </Row>
//                 </div>
//             </div >
//         )
//     }

// }

// const mapStateToProps = state => {
//     return {
//         language: state.app.language,
//         arrTime: state.admin.time,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         getGender: () => dispatch(action.getTimeAllCodeStart()),

//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from "reactstrap";
import "./SchedulePage.scss";
import { ToastContainer, toast } from 'react-toastify';
import * as adminService from "../../../services/adminService";
import * as action from "../../../store/actions/adminActions"
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import { LANGUAGE } from '../../../utils';

class SchedulePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTime: [],
            allDoctor: [],
            selectedOption: null,
            today: new Date(),
        }
    }

    async componentDidMount() {
        await this.getDoctorSelect();
        await this.props.getGender();
    }

    async getDoctorSelect() {
        let response = await adminService.getTopDoctor();
        if (response && response.errCode === 0) {
            let arrDoctor = response.data;
            if (arrDoctor && arrDoctor.length > 0) {
                let options = [];
                arrDoctor.map((item) => {
                    let ob = { value: item.id, label: item.lastName + " " + item.firstName }
                    options.push(ob)
                })
                this.setState({
                    allDoctor: options,
                })
            }
        }
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props.arrTime !== prevProps.arrTime) {
            let arr = this.props.arrTime;
            if (arr && !_.isEmpty(arr)) {
                arr = arr.map(item => ({ ...item, selected: false }))
            }
            this.setState({
                allTime: arr,
            })
        }
    }

    setStartDate = (chooseDate) => {
        this.setState({
            today: chooseDate,
        })
    }

    handleClickChoose = (timeChoose) => {
        let { allTime } = this.state;
        if (allTime && !_.isEmpty(allTime)) {
            for (let object of allTime) {
                if (object.id === timeChoose.id) {
                    object.selected = !object.selected;
                    break;
                }
            }
        }
        this.setState({
            allTime: allTime,
        })
    }

    handleClickSaveSchedule = async () => {
        let data = [];
        let { allTime, selectedOption, today } = this.state;
        if (!selectedOption || !today) {
            toast.warn(<FormattedMessage id="system.admin.schedule-doctor.warningMessage.selectDoctorAndDate" />);
            return;
        }
        for (let item of allTime) {
            if (item.selected === true) {
                data.push({
                    doctorId: selectedOption.value,
                    date: today.getTime(today.setHours(0, 0, 0, 0)),
                    timeType: item.keyMap,
                })
            }
        }
        if (!data || _.isEmpty(data)) {
            toast.warn(<FormattedMessage id="system.admin.schedule-doctor.warningMessage.selectSchedule" />);
            return;
        } else {
            let res = await adminService.createScheduleDoctor(data);
            if (res && res.errCode === 201) {
                let arr = this.state.allTime;
                if (arr && !_.isEmpty(arr)) {
                    arr = arr.map(item => ({ ...item, selected: false }))
                }
                this.setState({
                    allTime: arr,
                    selectedOption: null,
                    today: new Date(),
                })
                toast.success(<FormattedMessage id="system.admin.schedule-doctor.successMessage" />);
            } else if (res && res.errCode !== 201) {
                toast.error(res.message)
            }
        }
    }

    render() {
        let language = this.props.language;
        let { selectedOption, allDoctor, allTime } = this.state;
        return (
            <div className="container">
                <div className='schedulePage-doctor-content'>
                    <div className="text-center title"><FormattedMessage id="system.admin.schedule-doctor.title" /></div>
                    <Row className='select-datetime mt-3'>
                        <Col className='select-doctor' md={4}>
                            <label className='text'><FormattedMessage id="system.admin.schedule-doctor.selectDoctor" /></label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={allDoctor.length > 0 ? allDoctor : []}
                            />
                        </Col>
                        <Col md={1}></Col>
                        <Col className='datetime-doctor' md={4}>
                            <label className='text'><FormattedMessage id="system.admin.schedule-doctor.selectDate" /></label>
                            <div className='date-picker'><DatePicker
                                className='form-control '
                                showIcon
                                selected={this.state.today}
                                minDate={new Date()}
                                onChange={(date) => this.setStartDate(date)}
                            /></div>
                        </Col>
                    </Row>
                    <Row className='schedule-doctor-choose'>
                        {allTime && !_.isEmpty(allTime) && allTime.map((item) => {
                            return (
                                <div className={item.selected === true ? 'btn-schedule active' : 'btn-schedule'} key={item.id}
                                    onClick={() => { this.handleClickChoose(item) }}
                                >
                                    {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                </div>
                            )
                        })}
                    </Row>
                    <Row className='schedule-doctor-choose'>
                        <Button className='btn-schedule-save'
                            onClick={this.handleClickSaveSchedule}><FormattedMessage id="system.admin.schedule-doctor.btnSave" /></Button>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrTime: state.admin.time,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(action.getTimeAllCodeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
