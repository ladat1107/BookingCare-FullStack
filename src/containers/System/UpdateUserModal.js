import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class UpdateUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            address: "",
            phoneNumber: "",
            gender: "0",
            roleId: "1",
        }
    }

    componentDidMount() {
        let userCurrent = this.props.userUpdateProps;
        if (userCurrent) {
            this.setState({
                id: userCurrent.id,
                email: userCurrent.email,
                password: userCurrent.password,
                lastName: userCurrent.lastName,
                firstName: userCurrent.firstName,
                address: userCurrent.address,
                phoneNumber: userCurrent.phoneNumber,
                gender: userCurrent.gender,
                roleId: userCurrent.roleId,
            })
        }
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
        let arr = ["lastName", "firstName", "address", "phoneNumber"]
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert("Please enter your " + arr[i]);
                return false;
            }
        }
        return true;
    }
    handleButtonUpdate = () => {
        let isEmpty = this.checkEmptyInput();
        if (isEmpty === true) {
            this.props.updateUserProps(this.state);
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                centered            >
                <ModalHeader toggle={() => { this.toggle() }}>Update information user</ModalHeader>
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
                                        readOnly={true}
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
                                        readOnly={true}
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
                    <Button color="primary mx-3" onClick={() => { this.handleButtonUpdate() }}>
                        Save
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal);
