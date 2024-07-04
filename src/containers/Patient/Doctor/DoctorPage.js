import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col } from "reactstrap";
import HomePageHeader from '../../HomePage/HomePageHeader';
import HomePageFooter from '../../HomePage/HomePageFooter';
import DescriptionDoctor from '../Doctor/Session/DescriptionDoctor';
import ScheduleDoctor from "../../../components/Doctor/ScheduleDoctor";
import DoctorInfo from "../../../components/Doctor/DoctorInfo";
import DescriptionContent from "../Doctor/Session/DescriptionContent";
import * as userService from "../../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import "./DoctorPage.scss"
class DoctorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: [],
        }
    }

    async componentDidMount() {
        await this.getDoctorSelect();
    }
    async getDoctorSelect() {
        let doctorId = this.props.match.params.id;
        let respone = await userService.getDoctorMarkdown(doctorId);
        if (respone && respone.errCode === 201) {
            this.setState({
                doctor: respone.data,
            })
        } else {
            toast.warn(respone.message)
        }
    }


    render() {
        let { doctor } = this.state;
        return (
            <div>
                <HomePageHeader />
                {doctor ?
                    <Fragment>
                        <DescriptionDoctor doctorParent={doctor} />
                        <div className='container'>
                            <Row className='schedule-address-doctor'>
                                <Col md={7} className='schedule-doctor-left'>
                                    <ScheduleDoctor doctorParent={doctor ? doctor : []} />
                                </Col>
                                <Col md={5} className='address-doctor-right'>
                                    <DoctorInfo doctorInfor={doctor && doctor.Doctor_info ? doctor.Doctor_info : null} />
                                </Col>
                            </Row>
                        </div>
                        <DescriptionContent doctorParent={doctor} />
                    </Fragment>
                    : <> </>
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
