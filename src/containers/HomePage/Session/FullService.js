import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./FullService.scss";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
//import images from '../../../assets/headerHomePage/FullService';

class FullService extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //slideImages = images.keys().map(images);

    componentDidMount() {
    }


    render() {
        return (
            <div className="service-container" >
                <div className='service-content'>
                    <div className='service-header'>
                        <span><FormattedMessage id={"homepage-header.fullService"} /></span>
                    </div>
                    <div className="service-body">
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'><i className="fa-regular fa-hospital fa-beat fa-2xl"></i></div>
                                <div className='text'> <FormattedMessage id={"homepage-header.medicalSpecialties"} defaultMessage="Medical Specialties" /></div>
                            </div>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-phone fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.remoteConsultation"} defaultMessage="Remote Consultation" /></div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-stethoscope fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.generalCheckup"} defaultMessage="General Checkup" /></div>
                            </div>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-flask-vial fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.medicalTests"} defaultMessage="Medical Tests" /></div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-notes-medical fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.mentalHealth"} defaultMessage="Mental Health" /></div>
                            </div>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-tooth fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.dentalCheckup"} defaultMessage="Dental Checkup" /></div>
                            </div>
                        </div>
                        <div className='line'>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-box fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.surgicalPackage"} defaultMessage="Surgical Package" /></div>
                            </div>
                            <div className='item'>
                                <div className='icon'><i className="fa-solid fa-circle fa-beat fa-2xl"></i></div>
                                <div className='text'><FormattedMessage id={"homepage-header.diabetesCare"} defaultMessage="Diabetes Care" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullService);
