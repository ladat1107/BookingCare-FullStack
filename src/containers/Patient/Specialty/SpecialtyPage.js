import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col } from "reactstrap";
import HomePageHeader from '../../HomePage/HomePageHeader';
import HomePageFooter from '../../HomePage/HomePageFooter';
import DescriptionSpecialty from "../Specialty/Session/DescriptionSpecialty"
import ListDoctorSpecialty from "../Specialty/Session/ListDoctorSpecialty"
import * as userService from "../../../services/userService";
import { ToastContainer, toast } from 'react-toastify';
import "./SpecialtyPage.scss"
import _ from 'lodash';
class SpecialtyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyData: [],
        }
    }

    componentDidMount() {
        this.getDataSpecialtyPage()
    }
    getDataSpecialtyPage = async () => {
        let specialtyId = this.props.match.params.id;
        if (specialtyId) {
            let respone = await userService.getSpecialtyDoctorByDate(specialtyId)
            if (respone && respone.errCode === 201) {
                this.setState({
                    specialtyData: respone.data,
                })
            }
        }
    }


    render() {
        let { specialtyData } = this.state;
        let markdown = {};
        let listDoctor = [];
        if (specialtyData.Markdown && specialtyData.Markdown.specialtyId) {
            markdown = specialtyData.Markdown
        }
        if (specialtyData.specialtyData && !_.isEmpty(specialtyData.specialtyData)) {
            listDoctor = specialtyData.specialtyData;
        }
        return (
            <div>
                <HomePageHeader />
                {true ?
                    <Fragment>
                        {markdown ? <DescriptionSpecialty markdownData={markdown} image={specialtyData.image} /> : <></>}
                        {!_.isEmpty(listDoctor) ? <ListDoctorSpecialty listDoctor={listDoctor} /> : <></>}


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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyPage);
