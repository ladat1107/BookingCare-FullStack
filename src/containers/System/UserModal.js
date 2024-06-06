import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            address: "",
            phoneNumber: "",
            gender: "0",
            roleId: "1",
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_USER", () => {
            this.setState({
                email: "",
                password: "",
                lastName: "",
                firstName: "",
                address: "",
                phoneNumber: "",
                gender: "0",
                roleId: "1",
            })
        })


        // emitter.on("EVENT_CLEAR_MODAL_USER", data=>{
        //     console.log("Lấy đc giá trị nè: ", data)
        // })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState(copyState);

    }
    checkEmptyInput = () => {
        let arr = ["email", "password", "lastName", "firstName", "address", "phoneNumber"]
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert("Please enter your " + arr[i]);
                return false;
            }
        }
        return true;
    }
    handleButtonCreate = () => {
        let isEmpty = this.checkEmptyInput();
        if (isEmpty === true) {
            this.props.createUserProps(this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row mt-3">
                            <div className="form-row col-12">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, "email")}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInput(event, "password")}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Last name"
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="First name"
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="1234 Main St"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">Phone Number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputState">Sex</label>
                                    <select name="gender" className="form-control"
                                        value={this.state.gender}
                                        onChange={(event) => this.handleOnChangeInput(event, "gender")}
                                    >
                                        <option value="1">Female</option>
                                        <option value="0">Male</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputZip">Role</label>
                                    <select name="roleId" className="form-control"
                                        value={this.state.roleId}
                                        onChange={(event) => this.handleOnChangeInput(event, "roleId")}
                                    >
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary mx-3" onClick={() => { this.handleButtonCreate() }}>
                        Create User
                    </Button>{' '}
                    <Button color="secondary mx-3" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
