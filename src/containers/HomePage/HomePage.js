import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomePageHeader from './HomePageHeader';
import Intro from './Session/Intro';
import ForYou from './Session/ForYou';
import FullService from './Session/FullService';
import Specialty from './Session/Specialty';
import Facility from "./Session/Facility";
import Media from './Session/Media';
import HomePageFooter from './HomePageFooter';
import Doctor from './Session/Doctor';
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <HomePageHeader />
                <Intro />
                <ForYou />
                <FullService />
                <Specialty />
                <Doctor />
                <Facility />
                <Media />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
