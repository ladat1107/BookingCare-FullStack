import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManager.scss"
import { getAllUser, deleteUserService, createUserService, updateUserService } from "../../services/userService";
import ModalAddUser from "./UserModal";
import ModalUpdateUser from "./UpdateUserModal";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModal: false,
            isOpenUpdateModal: false,
            userUpdate: {},
        }
    }

    async componentDidMount() {
        await this.getAllUserServer();
    }
    getAllUserServer = async () => {
        let response = await getAllUser("ALL");

        if (response && response.errCode === 0) {
            await this.setState({
                arrUser: response.user,
            })
        }
    }

    handleClickAddUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }
    toggleFromParent = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }
    toggleUpdateFromParent = () => {
        this.setState({
            isOpenUpdateModal: !this.state.isOpenUpdateModal,
        })
    }
    createUserServer = async (data) => {
        try {
            let respone = await createUserService(data);
            if (respone && respone.errCode === 0) {
                this.setState({
                    isOpenModal: false,
                })
                this.getAllUserServer();
                emitter.emit("EVENT_CLEAR_MODAL_USER");
                // emitter.emit("EVENT_CLEAR_MODAL_USER",{"id":"your data"}) ->cái này truyền data đi UserModal.js
            } else {
                alert(respone.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    updateUserServer = async (data) => {
        try {
            let respone = await updateUserService(data);
            if (respone && respone.errCode === 0) {
                this.setState({
                    isOpenUpdateModal: false,
                })
                this.getAllUserServer();
            } else {
                alert(respone.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleUpdateUser = (user) => {
        this.setState({
            userUpdate: user,
            isOpenUpdateModal: true,
        })
    }

    handleDeteleUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                this.getAllUserServer();
                alert("Delete user successfull");
            } else {
                alert(res.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let allUser = this.state.arrUser;
        return (
            <div className="user-container">
                <ModalAddUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleFromParent}
                    createUserProps={this.createUserServer}
                />
                {this.state.isOpenUpdateModal &&
                    <ModalUpdateUser
                        isOpen={this.state.isOpenUpdateModal}
                        toggleFromParent={this.toggleUpdateFromParent}
                        updateUserProps={this.updateUserServer}
                        userUpdateProps={this.state.userUpdate}
                    />}
                <div className="text-center title">Manage users</div>
                <div className='m-3'>
                    <div className='btn btn-primary'
                        onClick={() => { this.handleClickAddUser() }}>
                        <i className="fa-solid fa-plus mx-2"></i>
                        <span className='m-2'>Add new user</span>
                    </div>
                </div>
                <div className="user-table mx-2">
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
                                allUser && allUser.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <i className="fa-solid fa-user-pen mx-3" onClick={() => { this.handleUpdateUser(item) }}></i>
                                                <i className="fa-solid fa-trash" onClick={() => { this.handleDeteleUser(item) }}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
