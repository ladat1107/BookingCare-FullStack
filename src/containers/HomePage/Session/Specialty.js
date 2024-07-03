import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./Specialty.scss";
import { withRouter } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import images from '../../../assets/headerHomePage/thankinh.png';
import * as action from '../../../store/actions/index';
import ItemSlider from "../../../components/HomePage/ItemSlider";

const properties = {
    prevArrow: <button className='custom'><i className="fa-solid fa-chevron-left icon"></i></button>,
    nextArrow: <button className='custom'><i className="fa-solid fa-chevron-right icon"></i></button>
}

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: [],
        }
    }
    componentDidMount() {
        this.props.getAllSpecialtyHome()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.specialtyArr !== prevProps.specialtyArr && this.props.specialtyArr) {
            this.setState({
                allSpecialty: this.props.specialtyArr,
            });

        }
    }
    handleClickSpecialty = (item) => {
        this.props.history.push(`/home-specialty/${item.id}`)
    }
    render() {
        let { allSpecialty } = this.state
        return (
            <div className="specialty-container" >
                <div className='specialty-content'>
                    <div className='up'>
                        <div className='text'> <FormattedMessage id={"homepage-header.specialty"} defaultMessage="Medical Specialties" /></div>
                        <div className='button'><FormattedMessage id="homepage-header.view_more" /></div>
                    </div>
                    <div className="down">
                        {allSpecialty && allSpecialty.length > 0 ?
                            <Slide
                                slidesToScroll={2}
                                slidesToShow={3}
                                indicators={true}
                                {...properties}
                            >
                                {allSpecialty.map((item, index) => {
                                    return (
                                        <div className='div-specailty-click' onClick={() => { this.handleClickSpecialty(item) }}
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
        specialtyArr: state.admin.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialtyHome: () => dispatch(action.getSpecialtySystemStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
