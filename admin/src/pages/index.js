import React from "react";
import { Link } from "gatsby";
import uni from './icons/uni.svg';
import '../app.css'

export default () => (
  <div className="center-me-auth0 column">
    <img src={uni} className="img-size-big" alt="logo" />
    <Link className="slick-button" to="/account">Go to your account</Link>
  </div>
)
