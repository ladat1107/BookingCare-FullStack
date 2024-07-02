import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
import * as userService from "../../../../services/userService";
import * as action from "../../../../store/actions";
import "./ListDoctorSpecialty.scss";
import DescriptionDoctor from '../../Doctor/Session/DescriptionDoctor';
import ScheduleDoctor from "../../../../components/Doctor/ScheduleDoctor";
import DoctorInfo from "../../../../components/Doctor/DoctorInfo";
import { LANGUAGE } from '../../../../utils';
import _ from 'lodash';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { it } from 'date-fns/locale';
// const listProvince = [
//     { label: "Tất cả", value: 1 },
//     { label: "Hồ Chí Minh", value: 2 },
//     { label: "Hà Nội", value: 3 },
// ]
class ListDoctorSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            listProvince: [],
            listDoctor: [],
            listData: [],
        }
    }

    async componentDidMount() {
        await this.props.getDoctorInfor();
        let myArray = this.props.listDoctor.map(item => {
            return {
                ...item,           // Sao chép các thuộc tính hiện có của đối tượng
                selected: true  // Gán giá trị cố định cho thuộc tính 'name'
            };
        });
        this.setState({
            listData: myArray,
            listDoctor: myArray,
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.arrProvince !== prevProps.arrProvince) {
            let arrProvince = this.props.arrProvince;
            if (arrProvince && arrProvince.length > 0) {
                let options = arrProvince.map(item => ({
                    value: item.keyMap,
                    label: this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn,
                }));
                options.unshift({ label: "Tất cả", value: "PRO0" })
                this.setState({
                    listProvince: options,
                    selectedOption: options[0]
                });
            }
        }
    }
    handleChange = (selectedOption) => {
        let listDoctorProvince = [...this.state.listData]; // Tạo bản sao mới của mảng

        if (selectedOption.value !== "PRO0") {
            listDoctorProvince = listDoctorProvince.map(doctor => {
                if (doctor.provinceId !== selectedOption.value) {
                    return {
                        ...doctor,
                        selected: false // Tạo bản sao mới của đối tượng và thay đổi thuộc tính 'selected'
                    };
                }
                return doctor;
            });
        }

        this.setState({
            listDoctor: listDoctorProvince,
            selectedOption: selectedOption
        });
    };
    handleClickDoctor = (item) => {
        console.log("check item: ", item)
        this.props.history.push(`/home-doctor/${item.User.id}`)
    }
    render() {
        let data = { ...this.state };
        // console.log("check state: ", data)
        return (
            <>
                <Row className='specialty-doctor-contaniner' >
                    <div className='specialty-doctor-content'>
                        <Row className='select-provnce-specialty'>
                            <Col md={3}>
                                <Select
                                    value={data.selectedOption}
                                    onChange={this.handleChange}
                                    options={data.listProvince}
                                /></Col>
                        </Row>
                        {!_.isEmpty(data.listDoctor) ?
                            <Row className='list-doctor-specialty'>
                                {data.listDoctor.map((item, index) => {
                                    if (item.selected) {
                                        let doctorInformations = { ...item }
                                        let userWithImage = { ...item.User };
                                        let imageBase64 = "https://png.pngtree.com/png-clipart/20211008/ourlarge/pngtree-cute-boy-doctor-avatar-logo-png-image_3976175.png";
                                        if (item.User.image) {
                                            imageBase64 = new Buffer(item.User.image, "base64").toString("binary");
                                        }
                                        userWithImage.image = imageBase64;
                                        return (
                                            <div className='item-list-doctor-specialty'
                                                key={index}
                                            >

                                                <Col md={7} className='left-content-item' onClick={() => { this.handleClickDoctor(item) }} >
                                                    <DescriptionDoctor
                                                        doctorParent={userWithImage ? userWithImage : []}
                                                    />
                                                </Col>
                                                <Col md={5} className='right-content-item'>
                                                    <div className='right-content-item-up' >
                                                        <ScheduleDoctor doctorParent={item.User ? item.User : []} />
                                                    </div>
                                                    <div className='right-content-item-down' >
                                                        <DoctorInfo doctorInfor={doctorInformations ? doctorInformations : null} />
                                                    </div>
                                                </Col>

                                            </div>
                                        )
                                    }

                                })}
                            </Row> : <div></div>}
                    </div>
                </Row>


            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrProvince: state.admin.province,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorInfor: () => dispatch(action.getDoctorInfoAllCodeStart()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctorSpecialty));
