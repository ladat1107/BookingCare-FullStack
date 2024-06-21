import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomePageHeader from '../../HomePage/HomePageHeader';

import HomePageFooter from '../../HomePage/HomePageFooter';
class DoctorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                <HomePageHeader />

                <HomePageFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
