import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ItemSlider.scss";
import images from "../../assets/headerHomePage/csyt.png"

class ItemSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }


    render() {
        let data = this.props;
        return (
            <div className='item-slider' >
                <div className='image-slider' style={{ 'backgroundImage': `url(${data.image})` }} ></div>
                <div className='text-slider'>{data.text}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemSlider);
