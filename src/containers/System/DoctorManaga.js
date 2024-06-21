import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
import * as adminService from "../../services/adminService";
import * as action from "../../store/actions"
import "./DoctorManaga.scss";
import { ToastContainer, toast } from 'react-toastify';

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGE } from '../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class DoctorManaga extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDoctor: [],
            selectedOption: null,
            htmlContent: "",
            markDownContent: "",
            description: "",
            doctorId: "",
            action: "",
        }
    }

    componentDidMount() {
        this.getDoctorSelect()
    }
    async getDoctorSelect() {
        let respone = await adminService.getTopDoctor();
        if (respone && respone.errCode === 0) {
            let arrDoctor = respone.data;
            if (arrDoctor && arrDoctor.length > 0) {

                let options = [];
                arrDoctor.map((item, index) => {
                    let ob = { value: item.id, label: item.lastName + " " + item.firstName }
                    options.push(ob)
                })
                this.setState({
                    allDoctor: options,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleChange = async (selectedOption) => {
        let respone = await adminService.getDoctorMarkdown(selectedOption.value);
        if (respone && respone.errCode === 201) {
            let item = respone.data;
            if (item.Markdown && item.Markdown.doctorId) {
                let Markdown = item.Markdown;
                this.setState({
                    description: Markdown.description ? Markdown.description : "",
                    htmlContent: Markdown.htmlContent ? Markdown.htmlContent : "",
                    markDownContent: Markdown.markDownContent ? Markdown.markDownContent : "",
                    doctorId: selectedOption && selectedOption.value ? selectedOption.value : "",
                    action: CRUD_ACTION.UPDATE,
                    selectedOption: selectedOption,
                })
            } else {
                this.setState({
                    description: "",
                    htmlContent: "",
                    markDownContent: "",
                    doctorId: selectedOption && selectedOption.value ? selectedOption.value : "",
                    action: CRUD_ACTION.CREATE,
                    selectedOption: selectedOption,
                })
            }
        } else {
            toast.warn(respone.message)
        }

    };

    handleSave = async () => {
        let { htmlContent, markDownContent, description, doctorId, action } = this.state
        if (!htmlContent || !markDownContent || !description || !doctorId || !action) {
            toast.warn("Vui lòng nhập đầy đủ thông tin")
        }
        else {
            let respone = await adminService.createDoctorPageInfor({
                htmlContent: htmlContent,
                markDownContent: markDownContent,
                description: description,
                doctorId: doctorId,
                clinicId: doctorId,
                specialtyId: doctorId,
                action: action,
            })
            if (respone && respone.errCode === 201) {
                if (action === CRUD_ACTION.UPDATE) {
                    toast.success("Cập nhật thành công")
                } else {
                    toast.success("Tạo mới thành công")
                }
                this.setState({
                    description: "",
                    htmlContent: "",
                    markDownContent: "",
                    doctorId: doctorId,
                    action: CRUD_ACTION.CREATE,
                    selectedOption: null,
                })
            } else {
                toast.error(respone.message)
            }
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            htmlContent: html,
            markDownContent: text,
        })

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    render() {
        let { selectedOption, allDoctor, markDownContent, description, action } = this.state;
        console.log("check all doctor: ", allDoctor)
        return (
            <div className="container" >
                <div className='managa-doc-content'>
                    <div className="text-center title">Thông tin bác sĩ</div>
                    <Row className='select-description mt-3'>
                        <Col className='select' md={4}>
                            <label className='text'> Select doctor: </label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={allDoctor.length > 0 ? allDoctor : []}
                            />

                            <Button className=' btn-save mt-3'
                                onClick={() => { this.handleSave() }}
                            >{action === CRUD_ACTION.UPDATE ? "Update " : "Save"} </Button>

                        </Col>
                        <Col md={1}></Col>
                        <Col className='description' md={7}>
                            <label className='text'> Description: </label>
                            <textarea
                                className="postContent"
                                rows={4}
                                value={description}
                                onChange={(event) => { this.handleOnChangeInput(event, "description") }} />
                        </Col>
                    </Row>
                    <Row className='mt-3 '>
                        <Col md={12}>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                value={markDownContent}
                                onChange={this.handleEditorChange} />
                        </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManaga);
