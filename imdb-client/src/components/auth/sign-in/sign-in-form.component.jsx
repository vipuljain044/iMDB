import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import authContext from "../../../common/context/authContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const SignInForm = () => {
  const history = useHistory();
  const {login} = useContext(authContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Enter an email"),
      password: Yup.string().required("Enter a password"),
    }),
    onSubmit: async ({ email, password }) => {
      const done = await login({email, password});
      if(done){
        toast.success("User Logged in");
        history.push("/")
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <span className="title">Sign-In</span>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...formik.getFieldProps("email")}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <div className="password-label-container">
          <Form.Label>Password</Form.Label>
        </div>
        <Form.Control
          type="password"
          name="password"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign-In
      </Button>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Keep me signed in." />
      </Form.Group>
    </Form>
  );
};

export default SignInForm;
