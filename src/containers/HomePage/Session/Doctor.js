import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from "../../../utils/constant";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./Doctor.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import * as action from "../../../store/actions";


const properties = {
    prevArrow: <button className='custom'><i className="fa-solid fa-chevron-left icon"></i></button>,
    nextArrow: <button className='custom'><i className="fa-solid fa-chevron-right icon"></i></button>
}

class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorArr: [],
        }
    }
    componentDidMount() {
        this.props.getTopDoctor(10);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.topDoctorRedux.length > 0 && this.props.topDoctorRedux !== prevProps.topDoctorRedux) {
            this.setState({
                doctorArr: this.props.topDoctorRedux
            })
        }
    }
    linkToDoctor = (doctor) => {
        this.props.history.push(`/home-doctor/${doctor.id}`)
    }
    render() {
        let allDoctor = this.state.doctorArr;
        let language = this.props.language;
        return (
            <div className="doctor-container" >
                <div className='doctor-content'>
                    <div className='up'>
                        <div className='text'><FormattedMessage id="homepage-header.highlighted_doctors" /></div>
                        <div className='button'><FormattedMessage id="homepage-header.view_more" /></div>
                    </div>
                    <div className="down">
                        {allDoctor && allDoctor.length > 0 ? <Slide
                            slidesToScroll={2}
                            slidesToShow={4}
                            indicators={true}
                            {...properties}
                        >
                            {allDoctor.map((item, index) => {
                                let imageBase64 = "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-boy-doctor-avatar-logo-png-image_6848835.png";
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, "base64").toString("binary")
                                }
                                let nameVi = item.positionData.valueVi + " " + item.lastName + " " + item.firstName;
                                let nameEn = item.positionData.valueEn + " " + item.firstName + " " + item.lastName;
                                return (
                                    <div className='item' key={index}>
                                        <div onClick={() => { this.linkToDoctor(item) }} className='image' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                        <div className='text-up'
                                            onClick={() => { this.linkToDoctor(item) }} >
                                            {language === LANGUAGE.VI ? nameVi : nameEn}
                                        </div>
                                        <div className='text-down'>Cơ sỡ y tế</div>
                                    </div>
                                )
                            })
                            }
                        </Slide> : <Fragment></Fragment>}

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        topDoctorRedux: state.user.topDoctor,
        isLoadDoctor: state.user.isLoadDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: (limit) => dispatch(action.getTopDoctorStart(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
