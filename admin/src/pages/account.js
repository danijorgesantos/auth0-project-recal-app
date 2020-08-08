import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"

import discount from './icons/002-discount.svg';
import collect from './icons/039-openbox.svg';
import rreturn from './icons/040-openbox.svg';
import userr from './icons/012-user.svg';
import returnedToday from './icons/013-info.svg';
import boxes from './icons/045-boxes.svg';

import './main.css';
import '../app.css';

import SideNavigation from './sideNavigation';
import ChartPage from './chart';
import Navbar from './Navbar'


const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <div>
      {/* <div class="loadingio-spinner-rolling-k8fitpcp7"><div class="ldio-inawj1mgkxk">
        <div></div>
      </div></div> */}
    </div>
  }

  const user = getProfile()

  return (
    <>
      <div>
        <Navbar></Navbar>
        <SideNavigation></SideNavigation>
        <div className="info-screen">
          <h1 className="dashboard-title">Analytics</h1>
          <div className="widget-section">
            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={boxes} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">Total Items</h2>
                <p className="info">530</p>
              </div>
            </div>

            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={collect} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">Returned</h2>
                <p className="info">230</p>
              </div>
            </div>

            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={rreturn} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">Already Took</h2>
                <p className="info">230</p>
              </div>
            </div>

            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={discount} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">% Returned</h2>
                <p className="info">230</p>
              </div>
            </div>

            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={userr} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">nº Users</h2>
                <p className="info">1130</p>
              </div>
            </div>

            <div className="widget-section__single-widget">
              <div className="icon-section">
                <img src={returnedToday} className="comma-logo" alt="logo" />
              </div>
              <div className="text-section">
                <h2 className="small-title">Returned today</h2>
                <p className="info">30</p>
              </div>
            </div>

          </div>
          <div className="chart-section">
            <div className="chart-section__chart">
              <ChartPage></ChartPage>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
