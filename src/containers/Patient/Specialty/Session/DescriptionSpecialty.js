import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
import * as userService from "../../../../services/userService";
import * as action from "../../../../store/actions";
import "./DescriptionSpecialty.scss";
import { ToastContainer, toast } from 'react-toastify';
import { LANGUAGE } from "../../../../utils/index"
class DescriptionSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false,
        }
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { language, image } = this.props;
        let markdown = this.props.markdownData;
        let { isShowMore } = this.state;
        return (
            <>
                {markdown && markdown.htmlContent ?
                    <div className='specialty-description-contaniner' >
                        <div className='background-image-spe' style={{ 'backgroundImage': `url(${image})` }}></div>
                        <Row className='descrition-content-specialty' >
                            <div className={isShowMore ? 'more' : 'less'} dangerouslySetInnerHTML={{ __html: markdown && markdown.htmlContent ? markdown.htmlContent : "" }}></div>
                            <div className='button-show-more'>
                                <span onClick={() => this.setState({ isShowMore: !this.state.isShowMore })}> {this.state.isShowMore ? <FormattedMessage id="common.showLess" /> : <FormattedMessage id="common.showMore" />}</span>
                            </div>
                        </Row>

                    </div>
                    : <div></div>}

            </>

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


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionSpecialty);
