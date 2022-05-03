import { Component, Fragment } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { Fade, Stagger } from 'react-animation-components';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else {
      return <div></div>;
    }
  }

  options() {
    return {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
  }
  /**
   * Method to render comments on a particular selected dish
   * @param {*} dish Selected Dish
   * @returns the view showing all of the comments
   */
  renderComments(comments, commentsLoading, commentsErrorMessage) {
    if(commentsLoading) {
      return (
        <Loading/>
      )
    }
    else if(commentsErrorMessage) {
      return (
        <div>
          <p>{commentsErrorMessage}</p>
          <p>Something went wrong while fetching the comments.</p>
      </div>
      )
    }
    else if (comments.length) {
      const dishId = comments[0].dishId;
      const commentsInfo = comments.map((element) => {
        return (
          <Fade in key={element.id}>
            <ul key={element.id} className="list-unstyled">
              <li>{element.comment}</li>
              <li>
                -- {element.author},{" "}
                {new Intl.DateTimeFormat("en-US", this.options()).format(
                  new Date(Date.parse(element.date))
                )}
              </li>
            </ul>
          </Fade>
        );
      });
      return (
        <Fragment>
          <Fragment>
            <Stagger in>
              {commentsInfo}
            </Stagger>
          </Fragment>
          <Fragment>
            <CommentForm postComment={this.props.postComment} dishId={dishId}/>
          </Fragment>
        </Fragment>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    if(this.props.isLoading) {
      return (
        <Loading/>
      )
    }
    else if(this.props.errorMessage) {
      return (
        <h1>Error Occurred</h1>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {this.renderComments(this.props.comments, this.props.commentsLoading, this.props.commentsErrorMessage)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
