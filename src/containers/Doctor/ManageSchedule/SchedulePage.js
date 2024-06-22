import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";

import "./SchedulePage.scss";
import { ToastContainer, toast } from 'react-toastify';
class SchedulePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }






    render() {

        return (
            <div className="container" >
                <div className='managa-doc-content'>
                    <div className="text-center title">Thông tin bác sĩ</div>
                    <Row className='select-description mt-3'>

                    </Row>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
