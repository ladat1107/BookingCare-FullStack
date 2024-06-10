import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./CircleText.scss";
import image from "../../assets/headerHomePage/csyt.png"

class CircleText extends Component {

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
            <div className='item-circle'>
                <div className='image-circle'></div>
                <div className='text-circle'>{data.text}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CircleText);
