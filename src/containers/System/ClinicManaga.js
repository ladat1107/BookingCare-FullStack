import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Input, Label, Button } from "reactstrap";
import * as adminService from "../../services/adminService";
import * as action from "../../store/actions"
import "./ClinicManaga.scss";
import { ToastContainer, toast } from 'react-toastify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGE, CommonUtils } from '../../utils';
import { it } from 'date-fns/locale';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManaga extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allClinic: [],
            selectedOption: null,
            htmlContent: "",
            markDownContent: "",
            nameClinic: "",
            image: "",
            urlImage: "",
            action: CRUD_ACTION.CREATE,
            clinicId: "",
            address: ""
        }
    }

    componentDidMount() {
        this.props.getClinicManaga()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clinicArr !== prevProps.clinicArr) {
            let clinicArr = this.props.clinicArr;
            let options = [];
            if (clinicArr && clinicArr.length > 0) {
                clinicArr.map((item) => {
                    options.push({
                        value: item.id,
                        label: item.name
                    })
                });
            }
            this.setState({
                allClinic: options,
            });
        }

    }

    handleChange = async (selectedOption) => {
        let response = await adminService.handleGetClinicById(selectedOption.value);
        if (response && response.errCode === 200) {
            let item = response.data;
            if (item.Markdown && item.Markdown.clinicId) {
                let { Markdown } = item;
                this.setState({
                    htmlContent: Markdown.htmlContent || "",
                    markDownContent: Markdown.markDownContent || "",
                    clinicId: selectedOption.value || "",
                    action: CRUD_ACTION.UPDATE,
                    selectedOption,
                    image: item.image,
                    urlImage: item.image,
                    nameClinic: item.name,
                    address: item.address
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
                    address: "",
                });
            }
        } else {
            toast.warn(response.message);
        }
    };

    handleSave = async () => {
        let { htmlContent, markDownContent, action, nameClinic, image, address } = this.state;
        if (!htmlContent || !markDownContent || !action || !nameClinic || !image || !address) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.createClinicPage({
                htmlContent, markDownContent, nameClinic, image, action: CRUD_ACTION.CREATE, address,
            });
            if (response && response.errCode === 200) {
                toast.success("Create successfully");
                this.props.getClinicManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, nameClinic: "", image: "", urlImage: "", address: "",
                });
            } else {
                toast.error(response.message);
            }
        }
    };
    handleUpdate = async () => {
        let { htmlContent, markDownContent, action, image, clinicId, nameClinic, address } = this.state;
        if (!htmlContent || !markDownContent || !action || !clinicId || !image || !nameClinic || !address) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.updateClinicPage({
                htmlContent, markDownContent, action, image, clinicId, nameClinic, address
            });
            if (response && response.errCode === 200) {
                toast.success("Update successfully");
                this.props.getClinicManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, clinicId: "", image: "", urlImage: "", nameClinic: "", address: "",
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
        let { clinicId, nameClinic } = this.state;
        if (!nameClinic || !clinicId) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.deleteClinicPage({
                clinicId, nameClinic
            });
            if (response && response.errCode === 200) {
                toast.success("Xóa chuyên khoa " + nameClinic + " thành công");
                this.props.getClinicManaga()
                this.setState({
                    htmlContent: "", markDownContent: "", action: CRUD_ACTION.CREATE, nameClinic: "", image: "", urlImage: "", address: "", selectedOption: null,
                });
            } else {
                toast.error(response.message);
            }
        }
    }

    render() {
        let { selectedOption, nameClinic, action, markDownContent, htmlContent, address, urlImage, allClinic } = this.state;

        return (
            <div className="container-specailty-managa">
                <div className='managa-doc-content'>
                    <div className="text-center title">
                        <FormattedMessage id={"system.admin.clinic.title"} />
                    </div>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail3">
                                    <FormattedMessage id="system.admin.clinic.name" />
                                </Label>
                                <Input
                                    id="exampleEmail3"
                                    name="nameClinic"
                                    //placeholder={<FormattedMessage id="system.admin.doctorInfor.clinicName" />}
                                    type="text"
                                    value={nameClinic}
                                    onChange={(event) => { this.handleOnChangeInput(event, "nameClinic") }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail3">
                                    <FormattedMessage id="system.admin.clinic.address" />
                                </Label>
                                <Input
                                    id="exampleEmail3"
                                    name="address"
                                    //placeholder={<FormattedMessage id="system.admin.doctorInfor.clinicName" />}
                                    type="text"
                                    value={address}
                                    onChange={(event) => { this.handleOnChangeInput(event, "address") }}
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
                                            <FormattedMessage id="common.delete" />
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <label className='text'>
                                <FormattedMessage id={"system.admin.doctorInfor.selectedClinic"} />
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={allClinic.length > 0 ? allClinic : []}
                            />
                        </Col>
                        <Col md={4}>
                            <FormGroup >
                                <Label
                                    for="exampleFile"
                                >
                                    <FormattedMessage id="system.admin.clinic.image" />
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
    clinicArr: state.admin.clinic
});

const mapDispatchToProps = dispatch => ({
    getClinicManaga: () => dispatch(action.getClinicSystemStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManaga);

