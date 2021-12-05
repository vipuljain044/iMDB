import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";

import SignUpForm from "./sign-up-form.component";

const SignUpPage = () => {

  return (
    <div className="sign-in-sign-up">
      <div className="form-page">
        <Helmet>
          <body class="light-bg"></body>
        </Helmet>
        <Container>
          <div className="form-container">
            <SignUpForm />
            <div className="spacing"></div>
            <div className="divider-section">
              <div className="divider-inner"></div>
              <div
                className={`${
                  0 < 600 ? "divider-break" : "account-exist"
                }`}
              >
                <span>Already have an account? </span>
              </div>
              <Link to="/sign-in">Sign-in</Link>
            </div>
          </div>
        </Container>
        <div className="divider-section">
          <div className="divider-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
