import Menu from "./MenuComponent";
import React, { Component } from "react";
import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  Routes,
  Route,
  Navigate as Redirect,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  fetchComments,
  fetchDishes,
  fetchPromos,
  fetchLeaders
} from "../redux/actionCreators";
import Loading from "./LoadingComponent";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (dishId, rating, author, comment) =>
      dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    resetFeedbackForm: () => dispatch(actions.reset("feedback"))
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.router.location.key} classNames="page" timeout={800}>
            <Routes>
              <Route
                path="/home"
                element={
                  <Home
                    dish={this.props.dishes.dishes.find((e) => e.featured)}
                    dishLoading={this.props.dishes.isLoading}
                    dishErrorMessage={this.props.dishes.errorMessage}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrorMessage={this.props.promotions.errorMessage}
                    promotion={this.props.promotions.promotions[0]}
                    leader={this.props.leaders.leaders[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrorMessage={this.props.leaders.leadersErrorMessage}
                  />
                }
              />
              <Route
                path="/contactus"
                element={
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
                }
              />
              <Route
                path="/aboutus"
                element={<About isLoading={this.props.leaders.isLoading} errorMessage={this.props.leaders.errorMessage} leaders={this.props.leaders.leaders}/>}
              />
              <Route
                exact
                path="/menu"
                element={
                  <Menu
                    dishes={this.props.dishes.dishes}
                    isLoading={this.props.dishes.isLoading}
                    errorMessage={this.props.dishes.errorMessage}
                  />
                }
              />
              <Route path="/loading" element={<Loading />} />
              <Route
                path={`menu/:id`}
                element={
                  <RenderDishDetails
                    dishes={this.props.dishes.dishes}
                    dishLoading={this.props.dishes.isLoading}
                    dishErrorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments}
                    commentsLoading={this.props.comments.isLoading}
                    commentsErrorMessage={this.props.comments.errorMessage}
                    postComment={this.props.postComment}
                  />
                }
              />
              <Route path="*" element={<Redirect to="/home" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

function RenderDishDetails(props) {
  const { id } = useParams();
  const {
    dishes,
    comments,
    dishLoading,
    dishErrorMessage,
    commentsLoading,
    commentsErrorMessage,
  } = props;
  const dish = dishes.find((dish) => dish.id === parseInt(id));
  const commentList = comments.filter(
    (comment) => comment.dishId === parseInt(id)
  );
  return (
    <DishDetail
      isLoading={dishLoading}
      errorMessage={dishErrorMessage}
      dish={dish}
      comments={commentList}
      postComment={props.postComment}
      commentsLoading={commentsLoading}
      commentsErrorMessage={commentsErrorMessage}
    />
  );
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
