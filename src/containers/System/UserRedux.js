import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { getAllCodeByType } from "../../services/userService";
import * as action from "../../store/actions"
import thunk from 'redux-thunk';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: [],
            gender: [],
            position: [],
        }
    }

    componentDidMount() {
        this.props.getGender();
        //this.props.getPosition();
    }
    getAllCode = async () => {
        try {
            let role = await getAllCodeByType("ROLE");
            if (role && role.errCode === 0) {
                this.setState({
                    role: role.allCode,
                })
            } else {
                alert(role.messgae)
            }
            let gender = await getAllCodeByType("gender");
            if (gender && gender.errCode === 0) {
                this.setState({
                    gender: gender.allCode,
                })
            } else {
                alert(gender.messgae)
            }
            let position = await getAllCodeByType("position");
            if (position && position.errCode === 0) {
                this.setState({
                    position: position.allCode,
                })
            } else {
                alert(position.messgae)
            }
        } catch (e) {
            console(e);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.gender !== prevProps.gender) {
            this.setState({
                gender: this.props.gender,
            })
        }
    }
    render() {
        let allRole = this.state.role;
        let allGender = this.state.gender;
        let allPositon = this.state.position;
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
                                    />
                                    {/* <Input invalid />
                            <FormFeedback>
                                Oh noes! that name is already taken
                            </FormFeedback> */}
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
                                            name="file"
                                            type="file"
                                        />

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
                        <Button className='mt-3' color="primary">
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
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //  changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        getGender: () => dispatch(action.getGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
