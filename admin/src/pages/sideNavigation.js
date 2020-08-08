import React, { Component } from 'react';
import { Link } from "gatsby";
import './sideNavigation.css';
import { logout } from "../utils/auth"

import qr from './icons/qr.svg';

class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="side-navigation">
                <div className="side-navigation__button">
                    Dashboard
                </div>
                <div className="side-navigation__button">
                    Items
                </div>
                <div className="side-navigation__button">
                    Rewards
                </div>
                <div className="side-navigation__button">
                    Settings
                </div>
                <a  className="side-navigation__button"
                    href="#logout"
                    onClick={e => {
                        logout()
                        e.preventDefault()
                    }}
                >
                    Log Out
                </a>

                <div className="qr-section">
                    <Link className="link" to="/qrcodecollect">
                        <div className="qr-section__button color">
                            <img src={qr} className="img-size" alt="logo" />
                            <h3 className="link">COLLECT</h3>
                        </div>
                    </Link>
                    <Link className="link" to="/qrcodereturn">
                        <div className="qr-section__button color">
                            <img src={qr} className="img-size" alt="logo" />
                            <h3 className="link">RETURN</h3>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SideNavigation;