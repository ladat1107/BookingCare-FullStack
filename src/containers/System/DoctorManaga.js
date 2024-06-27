// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback, FormText } from "reactstrap";
// import * as adminService from "../../services/adminService";
// import * as action from "../../store/actions"
// import "./DoctorManaga.scss";
// import { ToastContainer, toast } from 'react-toastify';

// import * as ReactDOM from 'react-dom';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// import Select from 'react-select';
// import { CRUD_ACTION, LANGUAGE } from '../../utils';


// const mdParser = new MarkdownIt(/* Markdown-it options */);

// class DoctorManaga extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             allDoctor: [],
//             allPrice: [],
//             allProvince: [],
//             allPayment: [],

//             selectedOption: null,
//             selectedPrice: null,
//             selectedProvince: null,
//             selectedPayment: null,
//             htmlContent: "",
//             markDownContent: "",
//             description: "",
//             doctorId: "",
//             action: "",
//             note: "",
//             nameClinic: "",
//             addressClinic: "",
//         }
//     }

//     async componentDidMount() {
//         await this.getDoctorSelect();
//         await this.props.getDoctorInfor();
//     }
//     async getDoctorSelect() {
//         let respone = await adminService.getTopDoctor();
//         if (respone && respone.errCode === 0) {
//             let arrDoctor = respone.data;
//             if (arrDoctor && arrDoctor.length > 0) {

//                 let options = [];
//                 arrDoctor.map((item, index) => {
//                     let ob = { value: item.id, label: item.lastName + " " + item.firstName }
//                     options.push(ob)
//                 })
//                 this.setState({
//                     allDoctor: options,
//                 })
//             }
//         }
//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.arrPrice !== prevProps.arrPrice) {
//             let arrPrice = this.props.arrPrice;
//             if (arrPrice && arrPrice.length > 0) {
//                 let options = [];
//                 let language = this.props.language
//                 arrPrice.map((item, index) => {
//                     let ob = { value: item.keyMap, label: language === LANGUAGE.VI ? item.valueVi : item.valueEn }
//                     options.push(ob)
//                 })
//                 this.setState({
//                     allPrice: options,
//                 })
//             }
//         }
//         if (this.props.arrPayment !== prevProps.arrPayment) {
//             let arrPayment = this.props.arrPayment;
//             if (arrPayment && arrPayment.length > 0) {
//                 let options = [];
//                 let language = this.props.language
//                 arrPayment.map((item, index) => {
//                     let ob = { value: item.keyMap, label: language === LANGUAGE.VI ? item.valueVi : item.valueEn }
//                     options.push(ob)
//                 })
//                 this.setState({
//                     allPayment: options,
//                 })
//             }
//         }
//         if (this.props.arrProvince !== prevProps.arrProvince) {
//             let arrProvince = this.props.arrProvince;
//             if (arrProvince && arrProvince.length > 0) {
//                 let options = [];
//                 let language = this.props.language
//                 arrProvince.map((item, index) => {
//                     let ob = { value: item.keyMap, label: language === LANGUAGE.VI ? item.valueVi : item.valueEn }
//                     options.push(ob)
//                 })
//                 this.setState({
//                     allProvince: options,
//                 })
//             }
//         }
//     }
//     handleChange = async (selectedOption) => {
//         let language = this.props.language
//         let respone = await adminService.getDoctorMarkdown(selectedOption.value);
//         if (respone && respone.errCode === 201) {
//             let item = respone.data;
//             if (item.Markdown && item.Markdown.doctorId && item.Doctor_info) {
//                 let Markdown = item.Markdown;
//                 let doctorInfor = item.Doctor_info;
//                 this.setState({
//                     description: Markdown.description ? Markdown.description : "",
//                     htmlContent: Markdown.htmlContent ? Markdown.htmlContent : "",
//                     markDownContent: Markdown.markDownContent ? Markdown.markDownContent : "",
//                     doctorId: selectedOption && selectedOption.value ? selectedOption.value : "",
//                     action: CRUD_ACTION.UPDATE,
//                     selectedOption: selectedOption,
//                     note: doctorInfor.note,
//                     addressClinic: doctorInfor.addressClinic,
//                     nameClinic: doctorInfor.nameClinic,
//                     selectedPayment: { value: doctorInfor.paymentId, label: language === LANGUAGE.VI ? doctorInfor.paymentData.valueVi : doctorInfor.paymentData.valueEn },
//                     selectedProvince: { value: doctorInfor.provinceId, label: language === LANGUAGE.VI ? doctorInfor.provinceData.valueVi : doctorInfor.provinceData.valueEn },
//                     selectedPrice: { value: doctorInfor.priceId, label: language === LANGUAGE.VI ? doctorInfor.priceData.valueVi : doctorInfor.priceData.valueEn },
//                 })
//             } else {
//                 this.setState({
//                     description: "",
//                     htmlContent: "",
//                     markDownContent: "",
//                     doctorId: selectedOption && selectedOption.value ? selectedOption.value : "",
//                     action: CRUD_ACTION.CREATE,
//                     selectedOption: selectedOption,
//                     action: "",
//                     note: "",
//                     nameClinic: "",
//                     addressClinic: "",
//                     selectedPrice: null,
//                     selectedProvince: null,
//                     selectedPayment: null,
//                 })
//             }
//         } else {
//             toast.warn(respone.message)
//         }

//     };

//     handleSave = async () => {
//         let { htmlContent, markDownContent, description, doctorId, action, note, addressClinic, nameClinic,
//             selectedPayment, selectedProvince, selectedPrice } = this.state
//         if (!htmlContent || !markDownContent || !description || !doctorId || !action
//             || !note || !addressClinic || !nameClinic || !selectedPayment || !selectedPrice || !selectedProvince
//         ) {
//             toast.warn("Vui lòng nhập đầy đủ thông tin")
//         }
//         else {
//             let respone = await adminService.createDoctorPageInfor({
//                 htmlContent: htmlContent,
//                 markDownContent: markDownContent,
//                 description: description,
//                 doctorId: doctorId,
//                 clinicId: doctorId,
//                 specialtyId: doctorId,
//                 note: note,
//                 addressClinic: addressClinic,
//                 nameClinic: nameClinic,
//                 paymentId: selectedPayment.value,
//                 provinceId: selectedProvince.value,
//                 priceId: selectedPrice.value,
//                 action: action,
//             })
//             if (respone && respone.errCode === 201) {
//                 if (action === CRUD_ACTION.UPDATE) {
//                     toast.success("Cập nhật thành công")
//                 } else {
//                     toast.success("Tạo mới thành công")
//                 }
//                 this.setState({
//                     description: "",
//                     htmlContent: "",
//                     markDownContent: "",
//                     doctorId: doctorId,
//                     action: CRUD_ACTION.CREATE,
//                     selectedOption: null,
//                     selectedPrice: null,
//                     selectedProvince: null,
//                     selectedPayment: null,
//                     action: "",
//                     note: "",
//                     nameClinic: "",
//                     addressClinic: "",
//                 })
//             } else {
//                 toast.error(respone.message)
//             }
//         }
//     }
//     handleEditorChange = ({ html, text }) => {
//         this.setState({
//             htmlContent: html,
//             markDownContent: text,
//         })

//     }
//     handleOnChangeInput = (event, id) => {
//         let copyState = { ...this.state };
//         copyState[id] = event.target.value;
//         this.setState({
//             ...copyState
//         })
//     }
//     handleChangeSelection = (event, name) => {
//         let copyState = { ...this.state };
//         copyState[name] = event;
//         this.setState({
//             ...copyState
//         })
//     }
//     render() {
//         let { selectedOption, selectedPrice, selectedProvince, selectedPayment,
//             allDoctor, allPrice, allProvince, allPayment,
//             markDownContent, description, action, note, addressClinic, nameClinic } = this.state;
//         // console.log("check state: ", this.state)
//         // console.log("check props: ", this.props)
//         return (
//             <div className="container" >
//                 <div className='managa-doc-content'>
//                     <div className="text-center title"><FormattedMessage id={"system.admin.doctorInfor.title"} /></div>
//                     <Row className='select-description mt-3'>
//                         <Col className='select' md={4}>
//                             <label className='text'><FormattedMessage id={"system.admin.doctorInfor.selectedDoctor"} /></label>
//                             <Select
//                                 value={selectedOption}
//                                 onChange={this.handleChange}
//                                 options={allDoctor.length > 0 ? allDoctor : []}
//                             />

//                             <Button className=' btn-save mt-3'
//                                 onClick={() => { this.handleSave() }}
//                             >{action === CRUD_ACTION.UPDATE ? "Update " : "Save"} </Button>

//                         </Col>
//                         <Col md={1}></Col>
//                         <Col className='description' md={7}>
//                             <label className='text'><FormattedMessage id={"system.admin.doctorInfor.descrition"} /> </label>
//                             <textarea
//                                 className="postContent"
//                                 rows={4}
//                                 value={description}
//                                 onChange={(event) => { this.handleOnChangeInput(event, "description") }} />
//                         </Col>
//                     </Row>
//                     <Row className='mt-3 '>
//                         <Col md={4}>
//                             <label className='text'><FormattedMessage id={"system.admin.doctorInfor.selectedPrice"}/> </label>
//                             <Select
//                                 value={selectedPrice}
//                                 onChange={(event) => { this.handleChangeSelection(event, "selectedPrice") }}
//                                 options={allPrice.length > 0 ? allPrice : []}
//                                 name={"selectedPrice"}
//                             /></Col>
//                         <Col md={4}>
//                             <label className='text'> Select Payment: </label>
//                             <Select
//                                 value={selectedPayment}
//                                 onChange={(event) => { this.handleChangeSelection(event, "selectedPayment") }}
//                                 options={allPayment.length > 0 ? allPayment : []}
//                                 name={"selectedPayment"}
//                             /></Col>
//                         <Col md={4}>
//                             <label className='text'> Select Province: </label>
//                             <Select
//                                 value={selectedProvince}
//                                 onChange={(event) => { this.handleChangeSelection(event, "selectedProvince") }}
//                                 options={allProvince.length > 0 ? allProvince : []}
//                                 name={"selectedProvince"}
//                             /></Col>
//                     </Row>
//                     <Row className='mt-3 '>
//                         <Col md={4}>
//                             <FormGroup>
//                                 <Label for="exampleEmail3"> Clinic Name </Label>
//                                 <Input
//                                     id="exampleEmail3"
//                                     name="nameClinic"
//                                     placeholder="Clinic Name"
//                                     type="text"
//                                     value={nameClinic}
//                                     onChange={(event) => { this.handleOnChangeInput(event, "nameClinic") }}
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col md={4}>
//                             <FormGroup>
//                                 <Label for="exampleEmail2"> Clinic Address </Label>
//                                 <Input
//                                     id="exampleEmail2"
//                                     name="addressClinic"
//                                     placeholder="Clinic Address"
//                                     type="text"
//                                     value={addressClinic}
//                                     onChange={(event) => { this.handleOnChangeInput(event, "addressClinic") }}
//                                 />
//                             </FormGroup>
//                         </Col>
//                         <Col md={4}>
//                             <FormGroup>
//                                 <Label for="exampleEmail1"> Note </Label>
//                                 <Input
//                                     id="exampleEmail1"
//                                     name="note"
//                                     placeholder="Note"
//                                     type="text"
//                                     value={note}
//                                     onChange={(event) => { this.handleOnChangeInput(event, "note") }}
//                                 />
//                             </FormGroup>
//                         </Col>
//                     </Row>
//                     <Row className='mt-3 '>
//                         <Col md={12}>
//                             <MdEditor
//                                 style={{ height: '500px' }}
//                                 renderHTML={text => mdParser.render(text)}
//                                 value={markDownContent}
//                                 onChange={this.handleEditorChange} />
//                         </Col>
//                     </Row>

//                 </div>
//             </div >
//         )
//     }

// }

// const mapStateToProps = state => {
//     return {
//         language: state.app.language,
//         arrPrice: state.admin.price,
//         arrPayment: state.admin.payment,
//         arrProvince: state.admin.province,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         // getGender: () => dispatch(action.getGenderStart()),
//         getDoctorInfor: () => dispatch(action.getDoctorInfoAllCodeStart()),

//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DoctorManaga);


import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Input, Label, Button } from "reactstrap";
import * as adminService from "../../services/adminService";
import * as action from "../../store/actions"
import "./DoctorManaga.scss";
import { ToastContainer, toast } from 'react-toastify';

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
            allPrice: [],
            allProvince: [],
            allPayment: [],

            selectedOption: null,
            selectedPrice: null,
            selectedProvince: null,
            selectedPayment: null,
            htmlContent: "",
            markDownContent: "",
            description: "",
            doctorId: "",
            action: "",
            note: "",
            nameClinic: "",
            addressClinic: "",
        }
    }

    async componentDidMount() {
        await this.getDoctorSelect();
        await this.props.getDoctorInfor();
    }

    async getDoctorSelect() {
        let response = await adminService.getTopDoctor();
        if (response && response.errCode === 0) {
            let arrDoctor = response.data;
            if (arrDoctor && arrDoctor.length > 0) {
                let options = arrDoctor.map(item => ({
                    value: item.id,
                    label: `${item.lastName} ${item.firstName}`
                }));
                this.setState({
                    allDoctor: options,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.arrPrice !== prevProps.arrPrice) {
            let arrPrice = this.props.arrPrice;
            if (arrPrice && arrPrice.length > 0) {
                let options = arrPrice.map(item => ({
                    value: item.keyMap,
                    label: this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn
                }));
                this.setState({
                    allPrice: options,
                });
            }
        }
        if (this.props.arrPayment !== prevProps.arrPayment) {
            let arrPayment = this.props.arrPayment;
            if (arrPayment && arrPayment.length > 0) {
                let options = arrPayment.map(item => ({
                    value: item.keyMap,
                    label: this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn
                }));
                this.setState({
                    allPayment: options,
                });
            }
        }
        if (this.props.arrProvince !== prevProps.arrProvince) {
            let arrProvince = this.props.arrProvince;
            if (arrProvince && arrProvince.length > 0) {
                let options = arrProvince.map(item => ({
                    value: item.keyMap,
                    label: this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn
                }));
                this.setState({
                    allProvince: options,
                });
            }
        }
    }

    handleChange = async (selectedOption) => {
        let language = this.props.language;
        let response = await adminService.getDoctorMarkdown(selectedOption.value);
        if (response && response.errCode === 201) {
            let item = response.data;
            if (item.Markdown && item.Markdown.doctorId && item.Doctor_info) {
                let { Markdown, Doctor_info: doctorInfor } = item;
                this.setState({
                    description: Markdown.description || "",
                    htmlContent: Markdown.htmlContent || "",
                    markDownContent: Markdown.markDownContent || "",
                    doctorId: selectedOption.value || "",
                    action: CRUD_ACTION.UPDATE,
                    selectedOption,
                    note: doctorInfor.note || "",
                    addressClinic: doctorInfor.addressClinic || "",
                    nameClinic: doctorInfor.nameClinic || "",
                    selectedPayment: {
                        value: doctorInfor.paymentId,
                        label: language === LANGUAGE.VI ? doctorInfor.paymentData.valueVi : doctorInfor.paymentData.valueEn
                    },
                    selectedProvince: {
                        value: doctorInfor.provinceId,
                        label: language === LANGUAGE.VI ? doctorInfor.provinceData.valueVi : doctorInfor.provinceData.valueEn
                    },
                    selectedPrice: {
                        value: doctorInfor.priceId,
                        label: language === LANGUAGE.VI ? doctorInfor.priceData.valueVi : doctorInfor.priceData.valueEn
                    },
                });
            } else {
                this.setState({
                    description: "",
                    htmlContent: "",
                    markDownContent: "",
                    doctorId: selectedOption.value || "",
                    action: CRUD_ACTION.CREATE,
                    selectedOption,
                    action: "",
                    note: "",
                    nameClinic: "",
                    addressClinic: "",
                    selectedPrice: null,
                    selectedProvince: null,
                    selectedPayment: null,
                });
            }
        } else {
            toast.warn(response.message);
        }
    };

    handleSave = async () => {
        let {
            htmlContent, markDownContent, description, doctorId, action,
            note, addressClinic, nameClinic, selectedPayment, selectedProvince, selectedPrice
        } = this.state;

        if (!htmlContent || !markDownContent || !description || !doctorId || !action ||
            !note || !addressClinic || !nameClinic || !selectedPayment || !selectedPrice || !selectedProvince) {
            toast.warn(<FormattedMessage id="system.admin.doctorInfor.warningMessage" />);
        } else {
            let response = await adminService.createDoctorPageInfor({
                htmlContent, markDownContent, description, doctorId, note, addressClinic, nameClinic, paymentId: selectedPayment.value,
                provinceId: selectedProvince.value, priceId: selectedPrice.value, action
            });

            if (response && response.errCode === 201) {
                if (action === CRUD_ACTION.UPDATE) {
                    toast.success("Update successfully");
                } else {
                    toast.success("Create successfully");
                }

                this.setState({
                    description: "", htmlContent: "", markDownContent: "", doctorId, action: CRUD_ACTION.CREATE,
                    selectedOption: null, selectedPrice: null, selectedProvince: null, selectedPayment: null,
                    action: "", note: "", nameClinic: "", addressClinic: "",
                });
            } else {
                toast.error(response.message);
            }
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({ htmlContent: html, markDownContent: text });
    };

    handleOnChangeInput = (event, id) => {
        this.setState({ [id]: event.target.value });
    };

    handleChangeSelection = (event, name) => {
        this.setState({ [name]: event });
    };

    render() {
        let {
            selectedOption, selectedPrice, selectedProvince, selectedPayment,
            allDoctor, allPrice, allProvince, allPayment, markDownContent,
            description, action, note, addressClinic, nameClinic
        } = this.state;

        return (
            <div className="container">
                <div className='managa-doc-content'>
                    <div className="text-center title">
                        <FormattedMessage id={"system.admin.doctorInfor.title"} />
                    </div>
                    <Row className='select-description mt-3'>
                        <Col className='select' md={4}>
                            <label className='text'>
                                <FormattedMessage id={"system.admin.doctorInfor.selectedDoctor"} />
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={allDoctor.length > 0 ? allDoctor : []}
                            />
                            <Button className='btn-save mt-3' onClick={() => { this.handleSave() }}>
                                {action === CRUD_ACTION.UPDATE ?
                                    <FormattedMessage id="system.admin.doctorInfor.btnUpdate" /> :
                                    <FormattedMessage id="system.admin.doctorInfor.btnSave" />}
                            </Button>
                        </Col>
                        <Col md={1}></Col>
                        <Col className='description' md={7}>
                            <label className='text'>
                                <FormattedMessage id={"system.admin.doctorInfor.descrition"} />
                            </label>
                            <textarea
                                className="postContent"
                                rows={4}
                                value={description}
                                onChange={(event) => { this.handleOnChangeInput(event, "description") }}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <label className='text'>
                                <FormattedMessage id={"system.admin.doctorInfor.selectedPrice"} />
                            </label>
                            <Select
                                value={selectedPrice}
                                onChange={(event) => { this.handleChangeSelection(event, "selectedPrice") }}
                                options={allPrice.length > 0 ? allPrice : []}
                                name={"selectedPrice"}
                            />
                        </Col>
                        <Col md={4}>
                            <label className='text'>
                                <FormattedMessage id="system.admin.doctorInfor.selectedPayment" />
                            </label>
                            <Select
                                value={selectedPayment}
                                onChange={(event) => { this.handleChangeSelection(event, "selectedPayment") }}
                                options={allPayment.length > 0 ? allPayment : []}
                                name={"selectedPayment"}
                            />
                        </Col>
                        <Col md={4}>
                            <label className='text'>
                                <FormattedMessage id="system.admin.doctorInfor.selectedProvince" />
                            </label>
                            <Select
                                value={selectedProvince}
                                onChange={(event) => { this.handleChangeSelection(event, "selectedProvince") }}
                                options={allProvince.length > 0 ? allProvince : []}
                                name={"selectedProvince"}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail3">
                                    <FormattedMessage id="system.admin.doctorInfor.clinicName" />
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
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail2">
                                    <FormattedMessage id="system.admin.doctorInfor.clinicAddress" />
                                </Label>
                                <Input
                                    id="exampleEmail2"
                                    name="addressClinic"
                                    //placeholder={<FormattedMessage id="system.admin.doctorInfor.clinicAddress" />}
                                    type="text"
                                    value={addressClinic}
                                    onChange={(event) => { this.handleOnChangeInput(event, "addressClinic") }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail1">
                                    <FormattedMessage id="system.admin.doctorInfor.note" />
                                </Label>
                                <Input
                                    id="exampleEmail1"
                                    name="note"
                                    //placeholder={<FormattedMessage id="system.admin.doctorInfor.note" />}
                                    type="text"
                                    value={note}
                                    onChange={(event) => { this.handleOnChangeInput(event, "note") }}
                                />
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
    arrPrice: state.admin.price,
    arrPayment: state.admin.payment,
    arrProvince: state.admin.province,
});

const mapDispatchToProps = dispatch => ({
    getDoctorInfor: () => dispatch(action.getDoctorInfoAllCodeStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManaga);

