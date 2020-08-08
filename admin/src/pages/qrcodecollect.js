'use strict';
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import './qrcodepage.css';
import { Link } from "gatsby";

import { connect } from 'react-redux';
import { getQrCodeCollect } from '../state/actions/data';

import Navbar from './Navbar'

class Collect extends Component {

    state = {
        size: 300,
        fgColor: '#000000',
        bgColor: '#ffffff',
        level: 'L',
        renderAs: 'svg',
        includeMargin: false,
    };

    componentDidMount() {
        this.props.getQrCodeCollect();
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="qrcode">
                    <QRCode
                        value={this.props.numberQrCodeCollect.toString()}
                        size={this.state.size}
                        fgColor={this.state.fgColor}
                        bgColor={this.state.bgColor}
                        level={this.state.level}
                        renderAs={this.state.renderAs}
                        includeMargin={this.state.includeMargin}
                    />
                </div>
                <Link to="/account" className="backButton">
                     Back to Dashboard
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    numberQrCodeCollect: state.data.numberQrCodeCollect
})

export default connect(mapStateToProps, { getQrCodeCollect })(Collect);