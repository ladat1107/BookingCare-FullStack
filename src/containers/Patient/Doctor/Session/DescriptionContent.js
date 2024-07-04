import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
import * as userService from "../../../../services/userService";
import * as action from "../../../../store/actions";
import "./DescriptionContent.scss";
import { ToastContainer, toast } from 'react-toastify';

class DescriptionContent extends Component {

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
        let doctor = this.props.doctorParent;
        let markdown = doctor.Markdown;
      
        return (
            <div className="container">
                <Row className='descrition-content-doctor'>
                   
                    <div dangerouslySetInnerHTML={{ __html: markdown && markdown.htmlContent ? markdown.htmlContent : "" }}></div>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionContent);
