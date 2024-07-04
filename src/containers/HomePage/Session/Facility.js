import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Facility.scss";
import { withRouter } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from '../../../assets/headerHomePage/viet-duc.jpg';
import * as action from '../../../store/actions/index';
import ItemSlider from "../../../components/HomePage/ItemSlider";

const properties = {
    prevArrow: <button className='custom'><i className="fa-solid fa-chevron-left icon"></i></button>,
    nextArrow: <button className='custom'><i className="fa-solid fa-chevron-right icon"></i></button>
}

class Facility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allClinic: [],
        }
    }

    componentDidMount() {
        this.props.getAllClinicHome()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clinicArr !== prevProps.clinicArr && this.props.clinicArr) {
            this.setState({
                allClinic: this.props.clinicArr,
            });

        }
    }
    handleClickClinic = (item) => {
        console.log("check item: ", item)
        this.props.history.push(`/home-clinic/${item.id}`)
    }

    render() {
        let { allClinic } = this.state
        return (
            <div className="facility-container" >
                <div className='facility-content'>
                    <div className='up'>
                        <div className='text'><FormattedMessage id="homepage-header.medical_facility" /></div>
                        <div className='button'><FormattedMessage id="homepage-header.view_more" /></div>
                    </div>
                    <div className="down">
                        {allClinic && allClinic.length > 0 ?
                            <Slide
                                slidesToScroll={2}
                                slidesToShow={3}
                                indicators={true}
                                //canSwipe={true}
                                {...properties}
                            >
                                {allClinic.map((item, index) => {
                                    return (
                                        <div className='div-clinic-click' onClick={() => { this.handleClickClinic(item) }}
                                            key={index}>
                                            <ItemSlider
                                                image={item.image}
                                                text={item.name}
                                            />
                                        </div>

                                    )
                                })
                                }
                            </Slide> : <></>}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        clinicArr: state.admin.clinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinicHome: () => dispatch(action.getClinicSystemStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Facility));
