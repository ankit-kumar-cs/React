import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  toggleModal() {
    return () => {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    };
  }
  handleSubmitForm() {
    return (event) => {
      const username = this.username.value;
      const password = this.password.value;
      const remember = this.remember.checked;
      alert("Form successfully submitted.\nUsername: " + username + "\nPassword: " + password + "\nRemember Me: " + remember);
      event.preventDefault();
    }
  }
  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal()}>
          <ModalHeader toggle={this.toggleModal()}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmitForm()}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" innerRef={(input) => (this.username = input)}></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" innerRef={(input) => (this.password = input)}></Input>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavbarBrand href="/">
                  <img
                    src={baseUrl + 'images/logo.png'}
                    height="30"
                    width="41"
                    alt="Ristorante Con Fusion"
                  />
                </NavbarBrand>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ms-auto">
                <NavItem>
                  <Button outline onClick={this.toggleModal()}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <div className="container-fluid p-5 jumbotron">
          <div className="container p-5">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;
