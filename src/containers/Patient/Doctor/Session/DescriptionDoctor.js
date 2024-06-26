import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
import * as userService from "../../../../services/userService";
import * as action from "../../../../store/actions";
import "./DescriptionDoctor.scss";
import { ToastContainer, toast } from 'react-toastify';
import { LANGUAGE } from "../../../../utils/index"
class DescriptionDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //doctor: props.doctorParent,
        }
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let language = this.props.language;
        let doctor = this.props.doctorParent;
        let markdown = doctor.Markdown;
        console.log("check doctor", doctor)
        let nameVi, nameEn = "";
        if (doctor && doctor.positionData) {
            nameVi = doctor.positionData.valueVi + " " + doctor.lastName + " " + doctor.firstName;
            nameEn = doctor.positionData.valueEn + " " + doctor.firstName + " " + doctor.lastName;
        }
        return (
            <div className="container">
                < Row className='select-description mt-3' >
                    <Col md={2} className='avatar'>
                        <div className="image-doctor"
                            style={{ backgroundImage: `url(${doctor.image})` }}
                        ></div>
                    </Col>
                    <Col md={10} className='description-doctor' >
                        <div className='title-description-doctor'>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: markdown && markdown.description ? markdown.description : "" }}></div>
                    </Col>
                </Row >
            </div >
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
        // getGender: () => dispatch(action.getGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionDoctor);
