import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logoutAction } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
    dispatch(navigate("/login"));
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Not Another To Do List</Navbar.Brand>
          </LinkContainer>

          {userInfo && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="ms-sm-auto">
                  {userInfo.verified === true && (
                    <LinkContainer to="/profile">
                      <Nav.Link>
                        <i className="fas fa-user me-1"></i>
                        {userInfo.name}'s Profile
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <Nav.Link onClick={logoutHandler}>
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
