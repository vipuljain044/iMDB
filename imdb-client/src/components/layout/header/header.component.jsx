import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Logo from "../../../static/assets/logo.png";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import Search from "./search/search.component";
import authContext from "common/context/authContext";

const Header = () => {
  const history = useHistory();
  const { user, logout } = useContext(authContext);

  return (
    <div className='header'>
      <Navbar className='navbar-custom' variant='dark'>
        <Container>
          <Navbar.Brand>
            <img
              className='logo'
              src={Logo}
              alt='logo'
              onClick={() => history.push("/")}
            />
          </Navbar.Brand>
          <Nav>
            <Form inline>
              <Search />
            </Form>

            {user && (
              <Link to='/sign-in' onClick={() => logout()}>
                <span>Sign Out</span>
              </Link>
            )}
            {!user && (
              <Link to='/sign-in' onClick={() => history.push("/sign-in")}>
                <span>Sign In</span>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
