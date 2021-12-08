import React, {useContext} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import authContext from "../../../common/context/authContext";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const {signup} = useContext(authContext);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Please enter a valid Name")
        .required("Enter your Name"),
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Enter an email"),
      password: Yup.string().min(8, null).required("Enter a password"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async ({ fullName, email, password }) => {
      const done = await signup({ email: email.toLowerCase(), password, fullName });
      if(done){
        toast.success("Signup successfull! Please Login in.");
        history.push("/sign-in")
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <span className="title"> Create account</span>
      <Form.Group controlId="formBasicName">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          {...formik.getFieldProps("fullName")}
          isInvalid={formik.touched.fullName && formik.errors.fullName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.fullName}
        </Form.Control.Feedback>
      </Form.Group>
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="at least 8 characters"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Text className="text-muted">
          Password must be at least 8 characters.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicVerifyPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
          isInvalid={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create your account
      </Button>
    </Form>
  );
};

export default SignUpForm;
