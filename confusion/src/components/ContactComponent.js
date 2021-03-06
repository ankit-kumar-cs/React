import React, { Component } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
            agree: false,
            contactType: "Tel.",
            message: "",
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
            },
        };
    }

    inputChange(event) {
        const name = event.target.name;
        const value =
            event.target.type === "checked"
                ? event.target.checked
                : event.target.value;
        this.setState({
            [name]: value,
        });
    }
    handleInputChange() {
        return (event) => {
            this.inputChange(event);
        };
    }

    handleBlur() {
        return (event) => {
            this.setState({
                touched: {
                    ...this.state.touched,
                    [event.target.name]: true,
                },
            });
        };
    }

    handleSubmit() {
        return (event) => {
            console.log("state", JSON.stringify(this.state));
            alert("Current State is: " + JSON.stringify(this.state));
            event.preventDefault();
        };
    }
    validate() {
        const errors = {
            firstname: "",
            lastname: "",
            telnum: "",
            email: "",
        };

        if (this.state.touched.firstname && this.state.firstname.length < 3)
            errors.firstname = "First Name should be >= 3 characters";
        else if (this.state.touched.firstname && this.state.firstname.length > 10)
            errors.firstname = "First Name should be <= 10 characters";

        if (this.state.touched.lastname && this.state.lastname.length < 3)
            errors.lastname = "Last Name should be >= 3 characters";
        else if (this.state.touched.lastname && this.state.lastname.length > 10)
            errors.lastname = "Last Name should be <= 10 characters";

        const regForTelNum = /^\d+$/;
        const regForEmail = /^\w+.+@.+/
        if (this.state.touched.telnum && !regForTelNum.test(this.state.telnum))
            errors.telnum = "Tel. Number should contain only numbers";

        if (
            this.state.touched.email &&
            !regForEmail.test(this.state.email)
        )
            errors.email = "Invalid email format";

        return errors;
    }
    isSubmitButtonDisabled() {
        return Object.values(this.validate()).some(error => error.length > 0) 
            || this.state.firstname.length === 0
            || this.state.lastname.length === 0
            || !(/^\d+$/.test(this.state.telnum))
            || !/^\w+.+@.+/.test(this.state.email);
    }
    render() {
        const errors = this.validate();
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road
                            <br />
                            Clear Water Bay, Kowloon
                            <br />
                            HONG KONG
                            <br />
                            <i className="fa fa-phone"></i>: +852 1234 5678
                            <br />
                            <i className="fa fa-fax"></i>: +852 8765 4321
                            <br />
                            <i className="fa fa-envelope"></i>:{" "}
                            <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a
                                role="button"
                                className="btn btn-primary"
                                href="tel:+85212345678"
                            >
                                <i className="fa fa-phone"></i> Call
                            </a>
                            <a role="button" className="btn btn-info">
                                <i className="fa fa-skype"></i> Skype
                            </a>
                            <a
                                role="button"
                                className="btn btn-success"
                                href="mailto:confusion@food.net"
                            >
                                <i className="fa fa-envelope-o"></i> Email
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit()}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>
                                First Name
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    valid={errors.firstname === ""}
                                    invalid={errors.firstname !== ""}
                                    onBlur={this.handleBlur()}
                                    onChange={this.handleInputChange()}
                                />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>
                                Last Name
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    valid={errors.lastname === ""}
                                    invalid={errors.lastname !== ""}
                                    onBlur={this.handleBlur()}
                                    onChange={this.handleInputChange()}
                                />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>
                                Contact Tel.
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="tel"
                                    id="telnum"
                                    name="telnum"
                                    placeholder="Tel. Number"
                                    value={this.state.telnum}
                                    valid={errors.telnum === ""}
                                    invalid={errors.telnum !== ""}
                                    onBlur={this.handleBlur()}
                                    onChange={this.handleInputChange()}
                                />
                                <FormFeedback>{errors.telnum}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>
                                Email
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    valid={errors.email === ""}
                                    invalid={errors.email !== ""}
                                    onBlur={this.handleBlur()}
                                    onChange={this.handleInputChange()}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 6, offset: 2 }}>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            name="agree"
                                            checked={this.state.agree}
                                            onChange={this.handleInputChange()}
                                        />{" "}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{ size: 3, offset: 1 }}>
                                <Input
                                    type="select"
                                    name="contactType"
                                    value={this.state.contactType}
                                    onChange={this.handleInputChange()}
                                >
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="message" md={2}>
                                Your Feedback
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="textarea"
                                    id="message"
                                    name="message"
                                    rows="12"
                                    value={this.state.message}
                                    onChange={this.handleInputChange()}
                                ></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type="submit" color="primary" disabled={this.isSubmitButtonDisabled()}>
                                    Send Feedback
                                </Button>
                            </Col>
                        </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
