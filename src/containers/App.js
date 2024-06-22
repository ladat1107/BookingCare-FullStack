import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { languages, path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import DoctorPage from "../containers/Patient/Doctor/DoctorPage";
import Doctor from "../routes/Doctor";

import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbar from "../components/CustomScrollbars";
import ConfirmModal from '../components/ConfirmModal';
import HomePage from '../containers/HomePage/HomePage';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <CustomScrollbar >
                        <div className="main-container">
                            <ConfirmModal />
                            <div className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.SYSTEM_DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={(HomePage)} />
                                    <Route path={path.DOCTOR} component={(DoctorPage)} />
                                </Switch>
                            </div>

                            <ToastContainer autoClose={3000} />
                        </div>
                    </CustomScrollbar>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);