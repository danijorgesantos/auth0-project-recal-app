import React from "react";
import { handleAuthentication } from "../utils/auth";
import '../app.css'

const Callback = () => {
  handleAuthentication()

  return <div class="center-me-auth0"><div class="loadingio-spinner-rolling-k8fitpcp7"><div class="ldio-inawj1mgkxk"><div></div></div></div></div>
}

export default Callback
