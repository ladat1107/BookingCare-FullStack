import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { getAllCodeByType } from "../../services/userService";
import * as action from "../../store/actions"
import thunk from 'redux-thunk';
import "./UserRedux.scss";
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roleArr: [],
            genderArr: [],
            positionArr: [],

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

        }
    }

    componentDidMount() {
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
        if (this.props.isCreateUser !== prevProps.isCreateUser && this.props.isCreateUser) {
            alert(this.props.isCreateUser);
            if (this.props.isCreateUser === "Create new user successfull") {
                this.setState({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    address: "",
                    phoneNumber: "",
                })
            }

        }
    }
    handleChangeImage = (event) => {
        let data = event.target.files;
        let firstImage = data[0];
        let urlImage = URL.createObjectURL(firstImage)
    }
    checkEmpty = () => {
        let arr = ["email", "password", "firstName", "lastName", "address", "phoneNumber"];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(arr[i] + " mustn't empty!");
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
            let user = this.state;
            let userCreate = {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                positionId: user.positionId,
                gender: user.gender,
                roleId: user.roleId,
                image: user.image,
            }
            this.props.createUserRedux(userCreate)
        }
    }
    render() {
        let data = this.state;
        let allRole = data.roleArr;
        let allGender = data.genderArr;
        let allPositon = data.positionArr;
        return (
            <div className="container" >
                <div className='user-redux-content'>
                    <div className="text-center title">Manage users redux</div>
                    <Form className='mt-5'>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Email
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        value={data.email}
                                        onChange={(event) => { this.handleChangeInput(event, "email") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="examplePassword">
                                        Password
                                    </Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="password placeholder"
                                        type="password"
                                        value={data.password}
                                        onChange={(event) => { this.handleChangeInput(event, "password") }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleFirstName">
                                        First Name
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
                                        Last Name
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
                                        Address
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
                                        Phone Number
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
                                        Gender
                                    </Label>
                                    <Input
                                        id="exampleGender"
                                        name="gender"
                                        type="select"
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
                                        Role
                                    </Label>
                                    <Col >
                                        <Input
                                            id="roleId"
                                            name="roleId"
                                            type="select"
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
                                        Position
                                    </Label>
                                    <Col >
                                        <Input
                                            id="positionId"
                                            name="positionId"
                                            type="select"
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
                                        File
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
                                                Tải ảnh
                                            </Label>
                                            {data.image ? <div className='image' style={{ backgroundImage: `url(${data.image})` }}></div> : <div></div>}
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
                                Check me out
                            </Label>
                        </FormGroup>
                        <Button className='mt-3' color="primary" onClick={() => { this.handleSaveUser() }}>
                            Sign in
                        </Button>
                    </Form>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(action.getGenderStart()),
        getPosition: () => dispatch(action.getPositionStart()),
        getRole: () => dispatch(action.getRoleStart()),
        createUserRedux: (data) => dispatch(action.createUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
