import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col } from "reactstrap";
import HomePageHeader from '../HomePage/HomePageHeader';
import HomePageFooter from '../HomePage/HomePageFooter';
import * as userService from "../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import "./ConformBooking.scss"
class ConformBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
    }

    async componentDidMount() {
        await this.getDoctorSelect();
    }
    async getDoctorSelect() {
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        if (doctorId && token) {
            let respone = await userService.confirmBookingDoctorService({ token: token, doctorId: doctorId });
            if (respone && respone.errCode !== 500) {
                this.setState({
                    lable: respone.message,
                })
            }
        }
    }
    render() {
        let { lable } = this.state;
        return (
            <div>
                <HomePageHeader />
                <div className='confirm-booking-message'>{lable}      <i className="fa-regular fa-heart"></i></div>
                <HomePageFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(ConformBooking);
