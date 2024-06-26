import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";

import * as action from "../../store/actions"
import thunk from 'redux-thunk';
import "./UserRedux.scss";
import { CRUD_ACTION, CommonUtils } from "../../utils"
import { ToastContainer, toast } from 'react-toastify';

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
            roleArr: [],
            genderArr: [],
            positionArr: [],
            urlImage: "",

            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            positionId: "",
            gender: "",
            roleId: "",
            image: "",
            action: "",
        }
    }

    componentDidMount() {
        this.props.getAllUser();
        this.props.getGender();
        this.props.getPosition();
        this.props.getRole();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genderArr !== prevProps.genderArr) {
            let genderUpdate = this.props.genderArr;
            this.setState({
                genderArr: genderUpdate,
                gender: genderUpdate && genderUpdate.length > 0 ? genderUpdate[0].keyMap : "",
            })
        }
        if (this.props.positionArr !== prevProps.positionArr) {
            let positionUpdate = this.props.positionArr;
            this.setState({
                positionArr: positionUpdate,
                positionId: positionUpdate && positionUpdate.length > 0 ? positionUpdate[0].keyMap : "",
            })
        }
        if (this.props.roleArr !== prevProps.roleArr) {
            let roleUpdate = this.props.roleArr;
            this.setState({
                roleArr: roleUpdate,
                roleId: roleUpdate && roleUpdate.length > 0 ? roleUpdate[0].keyMap : "",
            })
        }
        if (this.props.allUser !== prevProps.allUser) {
            this.setState({
                allUser: this.props.allUser,
            })
        }
        if (this.props.isDeleteUser !== prevProps.isDeleteUser && this.props.isDeleteUser === true) {
            toast.success(<FormattedMessage id="system.admin.user-redux.deleteUserSuccess" />, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if ((this.props.isCreateUser === false || this.props.isUpdateUser === false) && this.props.errorMessage !== prevProps.errorMessage && this.props.errorMessage) {
            toast.error(this.props.errorMessage, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if ((this.props.isCreateUser !== prevProps.isCreateUser && this.props.isCreateUser === true ||
            (this.props.isUpdateUser !== prevProps.isUpdateUser && this.props.isUpdateUser === true))) {
            if (this.state.action === CRUD_ACTION.UPDATE) {
                toast.success(<FormattedMessage id="system.admin.user-redux.updateUserSuccess" />, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                toast.success(<FormattedMessage id="system.admin.user-redux.createUserSuccess" />, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
            let genderUpdate = this.props.genderArr;
            let positionUpdate = this.props.positionArr;
            let roleUpdate = this.props.roleArr;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                positionId: positionUpdate && positionUpdate.length > 0 ? positionUpdate[0].keyMap : "",
                roleId: roleUpdate && roleUpdate.length > 0 ? roleUpdate[0].keyMap : "",
                gender: genderUpdate && genderUpdate.length > 0 ? genderUpdate[0].keyMap : "",
                urlImage: "",
                image: "",
                action: this.state.action === CRUD_ACTION.UPDATE ? CRUD_ACTION.CREATE : "",
            })
        }
    }

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
    checkEmpty = () => {
        let arr = ["email", "password", "firstName", "lastName", "address", "phoneNumber"];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(arr[i] + <FormattedMessage id={`system.admin.user-redux.${arr[i]}MustNotEmpty`} />);
                return true;
            }
        }
        return false;
    }
    handleChangeInput = (event, idInput) => {
        let copyState = { ...this.state };
        copyState[idInput] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    handleSaveUser = () => {
        let isEmpty = this.checkEmpty();
        if (isEmpty === false) {
            let dataState = this.state;
            let user = {
                email: dataState.email,
                password: dataState.password,
                firstName: dataState.firstName,
                lastName: dataState.lastName,
                address: dataState.address,
                phoneNumber: dataState.phoneNumber,
                positionId: dataState.positionId,
                gender: dataState.gender,
                roleId: dataState.roleId,
                image: dataState.image,
            }
            if (dataState.action === CRUD_ACTION.UPDATE) {
                user.id = dataState.id;

                this.props.updateUserRedux(user)
            } else {
                this.props.createUserRedux(user)
            }

        }
    }
    handleUpdateUser = (userUpdate) => {
        let imageBase64 = "";
        if (userUpdate.image) {
            imageBase64 = new Buffer(userUpdate.image, "base64").toString("binary");
        }
        this.setState({
            id: userUpdate.id,
            email: userUpdate.email,
            password: "HASH CODE",
            firstName: userUpdate.firstName,
            lastName: userUpdate.lastName,
            address: userUpdate.address,
            phoneNumber: userUpdate.phoneNumber,
            positionId: userUpdate.positionId,
            gender: userUpdate.gender,
            roleId: userUpdate.roleId,
            image: userUpdate.image,
            urlImage: imageBase64,
            action: CRUD_ACTION.UPDATE,
        }, () => {
            console.log("check update: ", this.state)
        })

    }
    handleDeteleUser = (user) => {
        if (user && user.id) {
            this.props.deleteUser(user.id);
        }
    }
    render() {
        let data = this.state;
        let allRole = data.roleArr;
        let allGender = data.genderArr;
        let allPositon = data.positionArr;
        let allUserData = data.allUser;
        return (
            <div className="container" >
                <div className='user-redux-content'>
                    <div className="text-center title"><FormattedMessage id="system.admin.user-redux.title" /></div>
                    <Form className='mt-5'>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        <FormattedMessage id="system.admin.user-redux.email" />
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        readOnly={data.action === CRUD_ACTION.UPDATE ? true : false}
                                        value={data.email}
                                        onChange={(event) => { this.handleChangeInput(event, "email") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="examplePassword">
                                        <FormattedMessage id="system.admin.user-redux.password" />
                                    </Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="password placeholder"
                                        type="password"
                                        value={data.password}
                                        readOnly={data.action === CRUD_ACTION.UPDATE ? true : false}
                                        onChange={(event) => { this.handleChangeInput(event, "password") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleFirstName">
                                        <FormattedMessage id="system.admin.user-redux.firstName" />
                                    </Label>
                                    <Input
                                        id="exampleFirstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        type="text"
                                        value={data.firstName}
                                        onChange={(event) => { this.handleChangeInput(event, "firstName") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleLastName">
                                        <FormattedMessage id="system.admin.user-redux.lastName" />
                                    </Label>
                                    <Input
                                        id="exampleLastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        type="text"
                                        value={data.lastName}
                                        onChange={(event) => { this.handleChangeInput(event, "lastName") }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleAddress">
                                        <FormattedMessage id="system.admin.user-redux.address" />
                                    </Label>
                                    <Input
                                        id="exampleAddress"
                                        name="address"
                                        placeholder="1234 Main St"
                                        value={data.address}
                                        onChange={(event) => { this.handleChangeInput(event, "address") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="examplePhone">
                                        <FormattedMessage id="system.admin.user-redux.phoneNumber" />
                                    </Label>
                                    <Input
                                        id="examplePhone"
                                        name="phoneNumber"
                                        placeholder="Phone number"
                                        value={data.phoneNumber}
                                        onChange={(event) => { this.handleChangeInput(event, "phoneNumber") }}
                                    />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleGender">
                                        <FormattedMessage id="system.admin.user-redux.gender" />
                                    </Label>
                                    <Input
                                        id="exampleGender"
                                        name="gender"
                                        type="select"
                                        value={data.gender ? data.gender : 0}
                                        onChange={(event) => { this.handleChangeInput(event, "gender") }}
                                    >{allGender && allGender.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        )
                                    })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup row>
                                    <Label
                                        for="roleId"
                                    >
                                        <FormattedMessage id="system.admin.user-redux.role" />
                                    </Label>
                                    <Col >
                                        <Input
                                            id="roleId"
                                            name="roleId"
                                            type="select"
                                            value={data.roleId ? data.roleId : 0}
                                            onChange={(event) => { this.handleChangeInput(event, "roleId") }}
                                        >
                                            {allRole && allRole.map((item, index) => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>
                                                        {item.valueVi}
                                                    </option>
                                                )
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup row>
                                    <Label
                                        for="positionId"
                                    >
                                        <FormattedMessage id="system.admin.user-redux.position" />
                                    </Label>
                                    <Col >
                                        <Input
                                            id="positionId"
                                            name="positionId"
                                            type="select"
                                            value={data.positionId ? data.positionId : 0}
                                            onChange={(event) => { this.handleChangeInput(event, "positionId") }}
                                        >
                                            {allPositon && allPositon.map((item, index) => {
                                                return (
                                                    <option key={item.id} value={item.keyMap}>
                                                        {item.valueVi}
                                                    </option>
                                                )
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup row>
                                    <Label
                                        for="exampleFile"
                                    >
                                        <FormattedMessage id="system.admin.user-redux.file" />
                                    </Label>
                                    <Col >
                                        <Input
                                            id="exampleFile"
                                            name="image"
                                            type="file"
                                            hidden={true}
                                            onChange={(event) => { this.handleChangeImage(event) }}
                                        />
                                        <div className='upload' >
                                            <Label
                                                className='label'
                                                for="exampleFile"
                                            >
                                                <FormattedMessage id="system.admin.user-redux.uploadImage" />
                                            </Label>
                                            {data.urlImage ? <div className='image' style={{ backgroundImage: `url(${data.urlImage})` }}></div> : <div></div>}
                                        </div>

                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup check className='mt-3'>
                            <Input
                                id="exampleCheck"
                                name="check"
                                type="checkbox"
                            />
                            <Label
                                check
                                for="exampleCheck"
                            >
                                <FormattedMessage id="system.admin.user-redux.checkMeOut" />
                            </Label>
                        </FormGroup>
                        <Button className='mt-3' color={data.action === CRUD_ACTION.UPDATE ? "warning" : "primary"} onClick={() => { this.handleSaveUser() }}>
                            <FormattedMessage id={data.action === CRUD_ACTION.UPDATE ? "system.admin.user-redux.updateUser" : "system.admin.user-redux.createUser"} />
                        </Button>
                    </Form>
                    <div className="user-table mx-2 mt-5">
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    allUserData && allUserData.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.email}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <i className="fa-solid fa-user-pen mx-3" onClick={() => { this.handleUpdateUser(item) }}></i>
                                                    <i className="fa-solid fa-trash"
                                                        hidden={data.action === CRUD_ACTION.UPDATE && data.id === item.id ? true : false}
                                                        onClick={() => { this.handleDeteleUser(item) }}></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderArr: state.admin.gender,
        roleArr: state.admin.role,
        positionArr: state.admin.position,
        isLoading: state.admin.isLoading,
        isCreateUser: state.admin.isCreateUser,
        isUpdateUser: state.admin.isUpdateUser,
        allUser: state.admin.allUser,
        isDeleteUser: state.admin.isDeleteUser,
        errorMessage: state.admin.errorMessage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(action.getGenderStart()),
        getPosition: () => dispatch(action.getPositionStart()),
        getRole: () => dispatch(action.getRoleStart()),
        createUserRedux: (data) => dispatch(action.createUserStart(data)),
        getAllUser: () => dispatch(action.getAllUserStart()),
        deleteUser: (userId) => dispatch(action.deleteUserStart(userId)),
        updateUserRedux: (data) => dispatch(action.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
