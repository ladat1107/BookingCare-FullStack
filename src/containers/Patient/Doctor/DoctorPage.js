import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomePageHeader from '../../HomePage/HomePageHeader';
import HomePageFooter from '../../HomePage/HomePageFooter';
import DescriptionDoctor from '../Doctor/Session/DescriptionDoctor';
import DescriptionContent from "../Doctor/Session/DescriptionContent";
import * as userService from "../../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
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
