import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Input, Label, Button } from "reactstrap";
import * as adminService from "../../services/adminService";
import * as action from "../../store/actions"
import "./SpecialtyManage.scss";
import { ToastContainer, toast } from 'react-toastify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGE, CommonUtils } from '../../utils';
import { it } from 'date-fns/locale';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: [],
            selectedOption: null,
            htmlContent: "",
            markDownContent: "",
            nameSpecialty: "",
            image: "",
            urlImage: "",
            action: CRUD_ACTION.CREATE,
            specialtyId: "",
        }
    }

    componentDidMount() {
        this.props.getSpecialtyManaga()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.specialtyArr !== prevProps.specialtyArr) {
            let specialtyArr = this.props.specialtyArr;
            let options = [];
            if (specialtyArr && specialtyArr.length > 0) {
                specialtyArr.map((item) => {
                    options.push({
                        value: item.id,
                        label: item.name
                    })
                });
            }
            this.setState({
                allSpecialty: options,
            });
        }

    }

    handleChange = async (selectedOption) => {
        let response = await adminService.handleGetSpecialtyById(selectedOption.value);
        if (response && response.errCode === 200) {
            let item = response.data;
            if (item.Markdown && item.Markdown.specialtyId) {
                let { Markdown } = item;
                this.setState({
                    htmlContent: Markdown.htmlContent || "",
                    markDownContent: Markdown.markDownContent || "",
                    specialtyId: selectedOption.value || "",
                    action: CRUD_ACTION.UPDATE,
                    selectedOption,
                    image: item.image,
                    urlImage: item.image,
                    nameSpecialty: item.name
                });
            } else {
                this.setState({
                    htmlContent: "",
                    markDownContent: "",
                    doctorId: selectedOption.value || "",
                    action: CRUD_ACTION.CREATE,
                    selectedOption,
                    action: "",
                    image: "",
                    urlImage: "",
                });
            }
        } else {
            toast.warn(response.message);
        }
    };

    handleSave = async () => {
        let { htmlContent, markDownContent, action, nameSpecialty, image } = this.state;
        if (!htmlContent || !markDownContent || !action || !nameSpecialty || !image) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.createSpecialtyPage({
                htmlContent, markDownContent, nameSpecialty, image, action: CRUD_ACTION.CREATE,
            });
            if (response && response.errCode === 200) {
                toast.success("Create successfully");
                this.props.getSpecialtyManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, nameSpecialty: "", image: "", urlImage: ""
                });
            } else {
                toast.error(response.message);
            }
        }
    };
    handleUpdate = async () => {
        let { htmlContent, markDownContent, action, image, specialtyId, nameSpecialty } = this.state;
        if (!htmlContent || !markDownContent || !action || !specialtyId || !image || !nameSpecialty) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.updateSpecialtyPage({
                htmlContent, markDownContent, action, image, specialtyId, nameSpecialty
            });
            if (response && response.errCode === 200) {
                toast.success("Update successfully");
                this.props.getSpecialtyManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, specialtyId: "", image: "", urlImage: "", nameSpecialty: ""
                });
            } else {
                toast.error(response.message);
            }
        }

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({ htmlContent: html, markDownContent: text });
    };

    handleOnChangeInput = (event, id) => {
        this.setState({ [id]: event.target.value });
    };
    handleChangeImage = async (event) => {
        let data = event.target.files;
        let firstImage = data[0];
        if (firstImage) {
            let base64 = await CommonUtils.toBase64(firstImage);
            let urlImage = URL.createObjectURL(firstImage)
            this.setState({
                urlImage: urlImage,
                image: base64,
            })
        }

    }
    handleDelete = async () => {
        let { specialtyId, nameSpecialty } = this.state;
        if (!nameSpecialty || !specialtyId) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.deleteSpecialtyPage({
                specialtyId, nameSpecialty
            });
            if (response && response.errCode === 200) {
                toast.success("Xóa chuyên khoa " + nameSpecialty + " thành công");
                this.props.getSpecialtyManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, nameSpecialty: "", image: "", urlImage: ""
                });
            } else {
                toast.error(response.message);
            }
        }
    }

    render() {
        let { selectedOption, nameSpecialty, action, markDownContent, htmlContent, image, urlImage, allSpecialty } = this.state;

        return (
            <div className="container-specailty-managa">
                <div className='managa-doc-content'>
                    <div className="text-center title">
                        <FormattedMessage id={"system.admin.specialty.title"} />
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail3">
                                    <FormattedMessage id="system.admin.doctorInfor.clinicName" />
                                </Label>
                                <Input
                                    id="exampleEmail3"
                                    name="nameSpecialty"
                                    //placeholder={<FormattedMessage id="system.admin.doctorInfor.clinicName" />}
                                    type="text"
                                    value={nameSpecialty}
                                    onChange={(event) => { this.handleOnChangeInput(event, "nameSpecialty") }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col md={2}> <Button className='btn-save mt-3' onClick={() => { this.handleSave() }}>
                                        <FormattedMessage id="system.admin.doctorInfor.btnSave" />
                                    </Button></Col>
                                    <Col md={3}>
                                        <Button className='btn-save mt-3' onClick={() => { this.handleUpdate() }}>
                                            <FormattedMessage id="system.admin.doctorInfor.btnUpdate" />
                                        </Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button className='btn-save mt-3' onClick={() => { this.handleDelete() }}>
                                            {/* <FormattedMessage id="system.admin.doctorInfor.btnUpdate" /> */}
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <label className='text'>
                                <FormattedMessage id={"system.admin.doctorInfor.selectedDoctor"} />
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={allSpecialty.length > 0 ? allSpecialty : []}
                            />
                        </Col>
                        <Col md={4}>
                            <FormGroup >
                                <Label
                                    for="exampleFile"
                                >
                                    <FormattedMessage id="system.admin.specialty.image" />
                                </Label>
                                <Col >
                                    <Input
                                        id="exampleFile"
                                        name="image"
                                        type="file"
                                        hidden={true}
                                        onChange={(event) => { this.handleChangeImage(event) }}
                                    />

                                </Col>
                                <Col md={4}>
                                    <div className='upload' >
                                        <Label
                                            className='label'
                                            for="exampleFile"
                                        >
                                            <FormattedMessage id="system.admin.user-redux.uploadImage" />
                                        </Label>
                                        {urlImage ? <div className='image' style={{ backgroundImage: `url(${urlImage})` }}></div> : <div></div>}
                                    </div>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={12}>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                value={markDownContent}
                                onChange={this.handleEditorChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    language: state.app.language,
    specialtyArr: state.admin.specialty
});

const mapDispatchToProps = dispatch => ({
    getSpecialtyManaga: () => dispatch(action.getSpecialtySystemStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);

